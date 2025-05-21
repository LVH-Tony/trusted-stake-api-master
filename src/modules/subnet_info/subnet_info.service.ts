import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubnetInfo } from './entities/subnet_info.entity';
import { hexToString } from '@polkadot/util';
import {
  SubnetInfoResponseDto,
  SubnetListResponseDto,
} from './subnet_info.dto';

@Injectable()
export class SubnetInfoService {
  constructor(
    @InjectRepository(SubnetInfo)
    private readonly subnetInfoRepository: Repository<SubnetInfo>,
  ) {}

  /**
   * Retrieve all subnet info records
   */
  async findAll(): Promise<SubnetListResponseDto> {
    const [data, count] = await this.subnetInfoRepository.findAndCount();
    return {
      data: data.map(this.toResponseDto),
      count,
    };
  }

  /**
   * Retrieve a single subnet info record by net_uid
   * @param net_uid The unique identifier of the subnet
   */
  async findOne(net_uid: number): Promise<SubnetInfoResponseDto | null> {
    const record = await this.subnetInfoRepository.findOne({
      where: { net_uid },
    });
    if (!record) return null;
    return this.toResponseDto(record);
  }

  private toResponseDto(subnet: SubnetInfo): SubnetInfoResponseDto {
    const {
      net_uid,
      timestamp,
      network_registered_at,
      tempo,
      emission,
      tao_in,
      alpha_in,
      alpha_out,
      subnet_volume,
      subnet_name,
      token_symbol,
    } = subnet;
    return {
      net_uid,
      updated_at: timestamp,
      network_registered_at,
      tempo,
      emission,
      tao_in_pool: tao_in,
      alpha_in_pool: alpha_in,
      alpha_staked: alpha_out,
      tao_volume: subnet_volume,
      name: hexToString(subnet_name),
      symbol: hexToString(token_symbol),
    };
  }

  async getTokenSymbol(net_uid: number): Promise<string | null> {
    const record = await this.subnetInfoRepository.findOne({
      where: { net_uid },
    });
    if (!record) return null;
    return hexToString(record.token_symbol);
  }
}
