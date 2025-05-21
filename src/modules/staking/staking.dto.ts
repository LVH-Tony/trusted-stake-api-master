// src/staking/dto/staking.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  PaginatedResponseDto,
  PaginationQueryDto,
} from '@/base/pagination/pagination.dto';
import { Staking } from './entities/staking.entity';
import { IsOptional } from 'class-validator';

export class StakingResponseDto {
  @ApiProperty({ description: 'Unique ID' })
  id: string;

  @ApiProperty({ description: 'Block height' })
  height: number;

  @ApiProperty({ description: 'Block timestamp', type: Date })
  timestamp: Date;

  @ApiProperty({ description: 'Extrinsic ID', required: false })
  extrinsic_id?: number;

  @ApiProperty({ description: 'Coldkey' })
  coldkey: string;

  @ApiProperty({ description: 'Hotkey' })
  hotkey: string;

  @ApiProperty({ description: 'Subnet ID' })
  net_uid: number;

  @ApiProperty({ description: 'TAO amount staked/unstaked', type: Number })
  tao: number;

  @ApiProperty({ description: 'Alpha amount', type: Number })
  alpha: number;

  @ApiProperty({
    description: 'Action type',
    enum: ['STAKING', 'UNSTAKING'],
  })
  action: string;

  static fromEntity(entity: Staking): StakingResponseDto {
    const {
      id,
      height,
      timestamp,
      extrinsic_id,
      coldkey,
      hotkey,
      net_uid,
      alpha,
      tao,
      action,
    } = entity;
    return {
      id,
      height,
      timestamp,
      extrinsic_id,
      coldkey,
      hotkey,
      net_uid,
      alpha,
      tao,
      action,
    };
  }
}

export class PaginatedStakingResponseDto extends PaginatedResponseDto<StakingResponseDto> {
  @ApiProperty({
    type: [StakingResponseDto],
    description: 'List of staking records',
  })
  declare data: StakingResponseDto[];
}

export class StakingQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Filter by coldkey' })
  @IsOptional()
  coldkey?: string;

  @ApiPropertyOptional({ description: 'Filter by hotkey' })
  @IsOptional()
  hotkey?: string;

  @ApiPropertyOptional({ description: 'Filter by subnet UID' })
  @IsOptional()
  net_uid?: number;

  @ApiPropertyOptional({
    enum: ['STAKING', 'UNSTAKING'],
    description: 'Filter by action type',
  })
  @IsOptional()
  action?: string;
}
