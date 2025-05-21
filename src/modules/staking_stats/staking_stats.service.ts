import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { BlockQueryDto, TemporalQueryDto, StatsResolutions } from './staking_stats.dto';
import { PaginatedResponseDto } from '@/base/pagination/pagination.dto';
import {
  StakingStats_1Min,
  StakingStats_5Min,
  StakingStats_Daily,
  StakingStats_Weekly,
  StakingStats_Monthly,
  StakingStats_Blocks,
} from './entities/staking-stats.entity';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class StakingStatsService {
  constructor(
    @InjectRepository(StakingStats_1Min)
    private readonly stats1MinRepo: Repository<StakingStats_1Min>,
    @InjectRepository(StakingStats_5Min)
    private readonly stats5MinRepo: Repository<StakingStats_5Min>,
    @InjectRepository(StakingStats_Daily)
    private readonly statsDailyRepo: Repository<StakingStats_Daily>,
    @InjectRepository(StakingStats_Weekly)
    private readonly statsWeeklyRepo: Repository<StakingStats_Weekly>,
    @InjectRepository(StakingStats_Monthly)
    private readonly statsMonthlyRepo: Repository<StakingStats_Monthly>,
    @InjectRepository(StakingStats_Blocks)
    private readonly statsBlocksRepo: Repository<StakingStats_Blocks>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  private getRepositoryByResolution(resolution: StatsResolutions) {
    switch (resolution) {
      case StatsResolutions.STATS_1MIN:
        return this.stats1MinRepo;
      case StatsResolutions.STATS_5MIN:
        return this.stats5MinRepo;
      case StatsResolutions.STATS_DAILY:
        return this.statsDailyRepo;
      case StatsResolutions.STATS_WEEKLY:
        return this.statsWeeklyRepo;
      case StatsResolutions.STATS_MONTHLY:
        return this.statsMonthlyRepo;
      default:
        throw new Error(`Unsupported resolution: ${resolution}`);
    }
  }

  async getTemporalStats(query: TemporalQueryDto): Promise<PaginatedResponseDto<any>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'ts_start',
      sortDirection = 'DESC',
      net_uid,
      ts_start,
      ts_end,
      resolution,
    } = query;

    const repository = this.getRepositoryByResolution(resolution);
    const queryBuilder = repository.createQueryBuilder('stats');

    if (net_uid) {
      queryBuilder.andWhere('stats.net_uid = :net_uid', { net_uid });
    }

    if (ts_start) {
      queryBuilder.andWhere('stats.ts_start >= :ts_start', { ts_start: new Date(ts_start * 1000) });
    }

    if (ts_end) {
      queryBuilder.andWhere('stats.ts_end <= :ts_end', { ts_end: new Date(ts_end * 1000) });
    }

    const [data, total] = await queryBuilder
      .orderBy(`stats.${sortBy}`, sortDirection)
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return new PaginatedResponseDto(data, total, page, limit);
  }

  async getBlockStats(query: BlockQueryDto): Promise<PaginatedResponseDto<any>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'block_start',
      sortDirection = 'DESC',
      net_uid,
      block_start,
      block_end,
    } = query;

    const queryBuilder = this.statsBlocksRepo.createQueryBuilder('stats');

    if (net_uid) {
      queryBuilder.andWhere('stats.net_uid = :net_uid', { net_uid });
    }

    if (block_start) {
      queryBuilder.andWhere('stats.block_start >= :block_start', { block_start });
    }

    if (block_end) {
      queryBuilder.andWhere('stats.block_end <= :block_end', { block_end });
    }

    const [data, total] = await queryBuilder
      .orderBy(`stats.${sortBy}`, sortDirection)
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return new PaginatedResponseDto(data, total, page, limit);
  }

  @Cron('1 * * * * *')
  async refreshData() {
    Logger.log('Updating staking stats tables');

    const start = Date.now();
    const { schema } = this.stats1MinRepo.metadata;
    await this.dataSource.query(`SET search_path TO ${schema}`);

    await this.dataSource.query(`select update_staking_stats_1min();`);
    await this.dataSource.query(`select update_staking_stats_5min();`);
    await this.dataSource.query(`select update_staking_stats_blocks();`);
    await this.dataSource.query(`select update_staking_stats_daily();`);
    await this.dataSource.query(`select update_staking_stats_weekly();`);
    await this.dataSource.query(`select update_staking_stats_monthly();`);

    Logger.log(`Updated staking stats tables: ${Date.now() - start} ms`);
  }
} 