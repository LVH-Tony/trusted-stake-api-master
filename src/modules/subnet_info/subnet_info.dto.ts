import { ApiProperty } from '@nestjs/swagger';

export class SubnetInfoResponseDto {
  @ApiProperty({ description: 'Subnet identifier' })
  net_uid: number;

  @ApiProperty({ description: 'Timestamp that the record was updated' })
  updated_at: Date;

  @ApiProperty({ description: 'Name of the subnet' })
  name: string;

  @ApiProperty({ description: "Symbol of the subnet's alpha token" })
  symbol: string;

  @ApiProperty({ description: 'Block number that the subnet was registered' })
  network_registered_at: number;

  @ApiProperty({ description: 'Tempo of the subnet' })
  tempo: number;

  @ApiProperty({ description: 'Emission of the subnet' })
  emission: number;

  @ApiProperty({ description: 'TAO liquidity' })
  tao_in_pool: number;

  @ApiProperty({ description: 'Alpha liquidity' })
  alpha_in_pool: number;

  @ApiProperty({ description: 'Alpha staked' })
  alpha_staked: number;

  @ApiProperty({
    description:
      'The total amount of TAO bought and sold since the start of the network.',
  })
  tao_volume: number;
}

export class SubnetListResponseDto {
  @ApiProperty({
    type: [SubnetInfoResponseDto],
    description: 'List of subnets',
  })
  data: SubnetInfoResponseDto[];

  @ApiProperty({
    description: 'Number of records',
  })
  count: number;
}
