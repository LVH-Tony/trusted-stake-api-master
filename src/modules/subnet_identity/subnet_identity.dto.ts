import { ApiProperty } from '@nestjs/swagger';

export class SubnetIdentityResponseDto {
  @ApiProperty({ description: 'Subnet identifier' })
  net_uid: number;

  @ApiProperty({ description: 'Timestamp that the record was updated' })
  updated_at: Date;

  @ApiProperty({ description: 'Name of the subnet' })
  subnet_name: string;

  @ApiProperty({ description: 'Github repository for the subnet' })
  github_repo: string;

  @ApiProperty({ description: 'Contact of the subnet owner' })
  subnet_contact: string;

  @ApiProperty({ description: "Url of the subnet's website" })
  subnet_url: string;

  @ApiProperty({ description: 'Discord server of the subnet' })
  discord: string;

  @ApiProperty({ description: 'Short description of the subnet' })
  description: string;

  @ApiProperty({ description: 'Additional information' })
  additional: string;
}

export class SubnetIdentityListResponseDto {
  @ApiProperty({
    type: [SubnetIdentityResponseDto],
    description: 'List of subnet identities',
  })
  data: SubnetIdentityResponseDto[];

  @ApiProperty({
    description: 'Number of records',
  })
  count: number;
}
