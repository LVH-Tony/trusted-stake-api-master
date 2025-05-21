import {
  PaginatedResponseDto,
  PaginationQueryDto,
} from '@/base/pagination/pagination.dto';
import { Validator } from './entities/validator.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional } from 'class-validator';

export class ValidatorResponseDto {
  @ApiProperty({ description: 'Subnet identifier' })
  net_uid: number;

  @ApiProperty({ description: 'Validator hotkey' })
  hotkey: string;

  @ApiProperty({
    description:
      'Indicates if the validator is active. True for active validators.',
  })
  active: boolean;

  static fromEntity(entity: Validator): ValidatorResponseDto {
    const { net_uid, hotkey, active } = entity;

    return { net_uid, hotkey, active } as ValidatorResponseDto;
  }
}

export class PaginatedValidatorResponseDto extends PaginatedResponseDto<ValidatorResponseDto> {
  @ApiProperty({
    type: [ValidatorResponseDto],
    description: 'Array of validator records',
  })
  declare data: ValidatorResponseDto[];
}

export class ValidatorQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    name: 'net_uid',
    description: 'Filter by subnet ID',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  net_uid?: number;

  @ApiProperty({
    required: false,
    description: 'Filter by validator hotkey',
  })
  @IsOptional()
  @Type(() => String)
  hotkey?: string;

  @ApiProperty({
    required: false,
    description:
      'Filter by validator status. Set to true for filtering out active validators',
  })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  active?: boolean;
}
