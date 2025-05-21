import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationService } from '@/base/pagination/pagination.service';
import { Staking } from './entities/staking.entity';
import {
  StakingResponseDto,
  PaginatedStakingResponseDto,
  StakingQueryDto,
} from './staking.dto';

@Injectable()
export class StakingService extends PaginationService<
  Staking,
  StakingResponseDto
> {
  // Whitelist of sortable columns for validation
  private readonly sortableColumns = [
    'height',
    'timestamp',
    'tao',
    'net_uid',
    'alpha',
  ];

  constructor(
    @InjectRepository(Staking)
    private readonly stakingRepository: Repository<Staking>,
  ) {
    super();
  }

  async findAll(query: StakingQueryDto): Promise<PaginatedStakingResponseDto> {
    const { coldkey, hotkey, net_uid, action, sortBy = 'height' } = query;

    // Validate sortBy parameter
    if (!this.sortableColumns.includes(sortBy)) {
      throw new BadRequestException(
        `Invalid sort field: ${sortBy}. ` +
          `Allowed values: ${this.sortableColumns.join(', ')}`,
      );
    }

    // Initialize query builder
    const queryBuilder = this.stakingRepository
      .createQueryBuilder('staking')
      .select();

    // Apply filters
    if (coldkey)
      queryBuilder.andWhere('staking.coldkey = :coldkey', { coldkey });

    if (hotkey) queryBuilder.andWhere('staking.hotkey = :hotkey', { hotkey });

    if (net_uid !== undefined)
      queryBuilder.andWhere('staking.net_uid = :net_uid', { net_uid });

    if (action) queryBuilder.andWhere('staking.action = :action', { action });

    return this.paginate(queryBuilder, { ...query, sortBy });
  }

  async findOne(id: string): Promise<StakingResponseDto | null> {
    const staking = await this.stakingRepository.findOne({
      where: { id },
    });

    if (!staking) return null;

    return StakingResponseDto.fromEntity(staking);
  }

  protected getRepository(): Repository<Staking> {
    return this.stakingRepository;
  }

  protected createResponseDto(entity: Staking): StakingResponseDto {
    return StakingResponseDto.fromEntity(entity);
  }
}
