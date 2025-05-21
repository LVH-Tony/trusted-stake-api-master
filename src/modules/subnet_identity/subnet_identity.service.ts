import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubnetIdentity } from './entities/subnet_identity.entity';
import {
  SubnetIdentityResponseDto,
  SubnetIdentityListResponseDto,
} from './subnet_identity.dto';

@Injectable()
export class SubnetIdentityService {
  constructor(
    @InjectRepository(SubnetIdentity)
    private readonly subnetIdentityRepo: Repository<SubnetIdentity>,
  ) {}

  /**
   * Retrieve all subnet identity records
   */
  async findAll(): Promise<SubnetIdentityListResponseDto> {
    const [data, count] = await this.subnetIdentityRepo.findAndCount();
    return {
      data: data.map(this.toResponseDto),
      count,
    };
  }

  /**
   * Retrieve a single subnet identity record by net_uid
   * @param net_uid The unique identifier of the subnet
   */
  async findOne(net_uid: number): Promise<SubnetIdentityResponseDto | null> {
    const record = await this.subnetIdentityRepo.findOne({
      where: { net_uid },
    });
    if (!record) return null;
    return this.toResponseDto(record);
  }

  private toResponseDto(subnet: SubnetIdentity): SubnetIdentityResponseDto {
    const {
      net_uid,
      timestamp,
      subnet_name,
      subnet_contact,
      subnet_url,
      github_repo,
      discord,
      additional,
      description,
    } = subnet;
    return {
      net_uid,
      updated_at: timestamp,
      subnet_name,
      subnet_contact,
      github_repo,
      subnet_url,
      discord,
      additional,
      description,
    };
  }
}
