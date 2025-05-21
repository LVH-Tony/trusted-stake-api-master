import { AlphaPrice, AlphaPriceHistory } from './entities/alpha_price.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  AlphaPriceResponseDto,
  AlphaPriceListResponse,
  AlphaPriceQueryDto,
  LatestPriceQueryDto,
} from './alpha_price.dto';
import { PaginationService } from '@/base/pagination/pagination.service';

@Injectable()
export class LatestPriceService extends PaginationService<
  AlphaPrice,
  AlphaPriceResponseDto
> {
  constructor(
    @InjectRepository(AlphaPrice)
    private readonly priceRepo: Repository<AlphaPrice>,
  ) {
    super();
  }

  async findAll(query: LatestPriceQueryDto): Promise<AlphaPriceListResponse> {
    const { sortBy = 'net_uid' } = query;
    const queryBuilder = this.priceRepo.createQueryBuilder('price').select();

    return this.paginate(queryBuilder, { ...query, sortBy });
  }

  protected getRepository(): Repository<AlphaPrice> {
    return this.priceRepo;
  }

  protected createResponseDto(entity: AlphaPrice): AlphaPriceResponseDto {
    return AlphaPriceResponseDto.fromEntity(entity);
  }
}

export class PriceHistoryService extends PaginationService<
  AlphaPriceHistory,
  AlphaPriceResponseDto
> {
  // Whitelist of sortable columns for validation
  private readonly sortableColumns = [
    'height',
    'timestamp',
    'net_uid',
    'price_in_tao',
  ];

  constructor(
    @InjectRepository(AlphaPriceHistory)
    private readonly priceRepo: Repository<AlphaPriceHistory>,
  ) {
    super();
  }

  async find(query: AlphaPriceQueryDto): Promise<AlphaPriceListResponse> {
    const {
      net_uid,
      start_block,
      end_block,
      start_time,
      end_time,
      sortBy = 'height',
    } = query;

    // Validate sortBy parameter
    if (!this.sortableColumns.includes(sortBy)) {
      throw new BadRequestException(
        `Invalid sort field: ${sortBy}. ` +
          `Allowed values: ${this.sortableColumns.join(', ')}`,
      );
    }

    if (start_block !== undefined && start_time !== undefined) {
      throw new BadRequestException(
        `Invalid filter provided: cannot use both start_block and start_time`,
      );
    }

    if (end_block !== undefined && end_time !== undefined) {
      throw new BadRequestException(
        `Invalid filter provided: cannot use both end_block and end_time`,
      );
    }

    // Initialize query builder
    const queryBuilder = this.priceRepo.createQueryBuilder('price').select();

    // Apply filters
    if (net_uid !== undefined)
      queryBuilder.andWhere('price.net_uid = :net_uid', { net_uid });

    if (start_block !== undefined)
      queryBuilder.andWhere('price.height >= :start_block', { start_block });

    if (end_block !== undefined)
      queryBuilder.andWhere('price.height <= :end_block', { end_block });

    if (start_time !== undefined)
      queryBuilder.andWhere('price.timestamp >= :start_time', { start_time });

    if (end_time !== undefined)
      queryBuilder.andWhere('price.timestamp <= :end_time', { end_time });

    return this.paginate(queryBuilder, { ...query, sortBy });
  }

  protected getRepository(): Repository<AlphaPriceHistory> {
    return this.priceRepo;
  }

  protected createResponseDto(
    entity: AlphaPriceHistory,
  ): AlphaPriceResponseDto {
    return AlphaPriceResponseDto.fromEntity(entity);
  }
}
