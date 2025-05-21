import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '@/base/pagination/pagination.dto';

export enum StatsResolutions {
  STATS_1MIN = '1min',
  STATS_5MIN = '5min',
  STATS_DAILY = 'daily',
  STATS_WEEKLY = 'weekly',
  STATS_MONTHLY = 'monthly',
}

export class TemporalQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    name: 'net_uid',
    description: 'Network UID',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  net_uid?: number;

  @ApiPropertyOptional({
    name: 'ts_start',
    description: 'Start timestamp (UTC)',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  ts_start?: number;

  @ApiPropertyOptional({
    name: 'ts_end',
    description: 'End timestamp (UTC)',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  ts_end?: number;

  @ApiProperty({
    name: 'resolution',
    description: 'Supported resolutions: 1min, 5min, daily, weekly, monthly',
    enum: StatsResolutions,
    default: StatsResolutions.STATS_1MIN,
  })
  @IsEnum(StatsResolutions)
  resolution: StatsResolutions;
}

export class BlockQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    name: 'net_uid',
    description: 'Network UID',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  net_uid?: number;

  @ApiPropertyOptional({
    name: 'block_start',
    description: 'Start block number',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  block_start?: number;

  @ApiPropertyOptional({
    name: 'block_end',
    description: 'End block number',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  block_end?: number;
} 