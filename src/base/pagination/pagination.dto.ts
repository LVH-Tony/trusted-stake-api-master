import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Page number (1-based)',
    type: Number,
    example: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    type: Number,
    example: 10,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(1000)
  @IsOptional()
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Field to sort by',
    type: String,
  })
  @IsOptional()
  sortBy?: string;

  @ApiPropertyOptional({
    description: 'Sort direction',
    enum: ['ASC', 'DESC'],
    example: 'DESC',
  })
  @IsEnum(['ASC', 'DESC'])
  @IsOptional()
  sortDirection?: 'ASC' | 'DESC' = 'DESC';
}

export class PaginatedResponseDto<T> {
  @ApiProperty({
    description: 'Array of items',
    isArray: true,
    type: 'array',
  })
  data: T[];

  @ApiProperty({
    description: 'Current page number',
    type: Number,
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    type: Number,
    example: 10,
  })
  limit: number;

  @ApiProperty({
    description: 'Total number of items',
    type: Number,
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: 'Total number of pages',
    type: Number,
    example: 10,
  })
  totalPages: number;

  constructor(data: T[], total: number, page: number, limit: number) {
    this.data = data;
    this.page = page;
    this.limit = limit;
    this.total = total;
    this.totalPages = Math.ceil(total / limit);
  }
}
