import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export enum OHLC_STATUS_CODE {
  OK = 'ok',
  ERROR = 'error',
  NO_DATA = 'no_data',
}

export class OhlcResponseDto {
  //status code. Expected values: ok | error | no_data
  s: string;

  // Error message. Should be present only when s = 'error'
  errmsg?: string;

  // Bar time. Unix timestamp (UTC)
  t?: number[];

  // Closing price
  c?: number[];

  // Opening price (optional)
  o?: number[];

  // High price (optional)
  h?: number[];

  // Low price (optional)
  l?: number[];

  // Volume (optional)
  v?: number[];

  // Time of the next bar if there is no data (status code is no_data) in the requested period (optional)
  nextTime?: number;
}

export enum OhlcResolutions {
  OHLC_1MIN = '1min',
  OHLC_5MIN = '5min',
  OHLC_15MIN = '15min',
  OHLC_60MIN = '60min',
  OHLC_1DAY = '1day',
}

export class OhlcQueryDto {
  @ApiProperty({
    name: 'symbol',
    description: 'Symbol name of the subnet token',
    example: 'SUB-32',
  })
  @IsString()
  @Transform(({ value }) => value.toUpperCase())
  symbol: string;

  @ApiProperty({
    name: 'from',
    description: 'Unix timestamp (UTC) of leftmost required bar',
  })
  @IsInt()
  @Type(() => Number)
  from: number;

  @ApiProperty({
    name: 'to',
    description:
      'Unix timestamp (UTC) of rightmost required bar (not inclusive)',
  })
  @IsInt()
  @Type(() => Number)
  to: number;

  @ApiProperty({
    name: 'resolution',
    description: 'Supported resolutions: 1min, 5min, 15min, 60min, 1day',
    enum: OhlcResolutions,
    default: OhlcResolutions.OHLC_1MIN,
  })
  @IsEnum(OhlcResolutions)
  resolution: OhlcResolutions;

  @ApiPropertyOptional({
    name: 'countback',
    description:
      'number of bars (higher priority than from) starting with to. If countback is set, from should be ignored.',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  countback?: number;
}
