import {
  Ohlc_1Day,
  Ohlc_1Min,
  Ohlc_5Min,
  Ohlc_15Min,
  Ohlc_60Min,
} from './entities/ohlc.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  OHLC_STATUS_CODE,
  OhlcQueryDto,
  OhlcResolutions,
  OhlcResponseDto,
} from './ohlc.dto';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class OhlcService {
  constructor(
    @InjectRepository(Ohlc_1Min)
    private readonly ohlc1MinRepo: Repository<Ohlc_1Min>,
    @InjectRepository(Ohlc_5Min)
    private readonly ohlc5MinRepo: Repository<Ohlc_5Min>,
    @InjectRepository(Ohlc_15Min)
    private readonly ohlc15MinRepo: Repository<Ohlc_15Min>,
    @InjectRepository(Ohlc_60Min)
    private readonly ohlc60MinRepo: Repository<Ohlc_60Min>,
    @InjectRepository(Ohlc_1Day)
    private readonly ohlc1DayRepo: Repository<Ohlc_1Day>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  private parseSymbol(symbol: string): number | null {
    if (!symbol.startsWith('SUB-')) return null;
    const uid = symbol.slice(4);
    if (/^\d+$/.test(uid)) return parseInt(uid);
    return null;
  }

  private getRepository(resolution: OhlcResolutions) {
    switch (resolution) {
      case OhlcResolutions.OHLC_1MIN:
        return this.ohlc1MinRepo;
      case OhlcResolutions.OHLC_5MIN:
        return this.ohlc5MinRepo;
      case OhlcResolutions.OHLC_15MIN:
        return this.ohlc15MinRepo;
      case OhlcResolutions.OHLC_60MIN:
        return this.ohlc60MinRepo;
      case OhlcResolutions.OHLC_1DAY:
        return this.ohlc1DayRepo;
    }
  }

  async getHistoryData(query: OhlcQueryDto): Promise<OhlcResponseDto> {
    const { symbol, resolution, from, to, countback } = query;

    try {
      const net_uid = this.parseSymbol(symbol);
      if (net_uid === null)
        return {
          s: OHLC_STATUS_CODE.ERROR,
          errmsg: 'Invalid symbol provided.',
        } as OhlcResponseDto;

      const repo = this.getRepository(resolution);
      let query = repo
        .createQueryBuilder('ohlc')
        .where('ohlc.net_uid = :net_uid', { net_uid })
        .andWhere('ohlc.end_time <= to_timestamp(:to)', { to })
        .orderBy('ohlc.start_time', 'ASC');

      if (countback !== undefined) {
        query.limit(countback);
      } else {
        query = query.andWhere('ohlc.start_time >= to_timestamp(:from)', {
          from,
        });
        query.limit(2000);
      }

      const data = await query.getMany();

      if (data.length === 0)
        return {
          s: OHLC_STATUS_CODE.NO_DATA,
        } as OhlcResponseDto;

      return {
        s: OHLC_STATUS_CODE.OK,
        t: data.map((item) => Math.floor(item.startTime.valueOf() / 1000)),
        o: data.map((item) => item.open),
        h: data.map((item) => item.high),
        l: data.map((item) => item.low),
        c: data.map((item) => item.close),
      } as OhlcResponseDto;
    } catch (e) {
      Logger.error(e);
      return {
        s: OHLC_STATUS_CODE.ERROR,
        errmsg: 'Internal server error',
      } as OhlcResponseDto;
    }
  }

  @Cron('1 * * * * *')
  async refreshData() {
    Logger.log('Updating OHLC data tables');

    const start = Date.now();
    const { schema } = this.ohlc1MinRepo.metadata;
    await this.dataSource.query(`SET search_path TO ${schema}`);

    await this.dataSource.query(`select update_ohlc_1min();`);
    await this.dataSource.query(`select update_ohlc_5min();`);
    await this.dataSource.query(`select update_ohlc_15min();`);
    await this.dataSource.query(`select update_ohlc_60min();`);
    await this.dataSource.query(`select update_ohlc_1day();`);

    Logger.log(`Updated OHLC data tables: ${Date.now() - start} ms`);
  }
}
