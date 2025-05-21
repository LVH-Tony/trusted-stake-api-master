import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AlphaPrice, AlphaPriceHistory } from './entities/alpha_price.entity';
import { IsDate, IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import {
  PaginatedResponseDto,
  PaginationQueryDto,
} from '@/base/pagination/pagination.dto';

export class AlphaPriceResponseDto {
  @ApiProperty({ description: 'Block height when the price was recorded' })
  height: number;

  @ApiProperty({
    description: 'Block timestamp when the price was recorded',
    nullable: true,
    required: false,
  })
  timestamp: Date | null;

  @ApiProperty({ description: 'Subnet ID' })
  net_uid: number;

  @ApiProperty({ description: 'Price value in TAO' })
  price_in_tao: number;

  static fromEntity(
    entity: AlphaPrice | AlphaPriceHistory,
  ): AlphaPriceResponseDto {
    const { id: _, ...data } = entity;
    return data as AlphaPriceResponseDto;
  }

  static fromEntities(entities: AlphaPrice[]): AlphaPriceResponseDto[] {
    return entities.map((entity) => this.fromEntity(entity));
  }
}
1;

export class AlphaPriceListResponse extends PaginatedResponseDto<AlphaPriceResponseDto> {}

export class LatestPriceQueryDto extends PaginationQueryDto {}

export class AlphaPriceQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    name: 'net_uid',
    description: 'Filter by subnet ID',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  net_uid?: number;

  // @ApiPropertyOptional({
  //   name: 'block',
  //   description: 'Filter by block height',
  // })
  // @IsOptional()
  // @IsInt()
  // @Type(() => Number)
  // height?: number;

  @ApiPropertyOptional({
    name: 'start_block',
    description: 'Filter block range - start block',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  start_block?: number;

  @ApiPropertyOptional({
    name: 'end_block',
    description: 'Filter block range - end block',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  end_block?: number;

  @ApiPropertyOptional({
    name: 'start_time',
    description: 'Filter timestamp range - start time',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  start_time?: Date;

  @ApiPropertyOptional({
    name: 'end_time',
    description: 'Filter timestamp range - end time',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  end_time?: Date;
}
