import { Injectable } from '@nestjs/common';
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { PaginationQueryDto } from './pagination.dto';
import { PaginatedResponseDto } from './pagination.dto';

@Injectable()
export abstract class PaginationService<
  Entity extends ObjectLiteral,
  ResponseDto,
> {
  protected abstract getRepository(): Repository<Entity>;
  protected abstract createResponseDto(entity: Entity): ResponseDto;

  async paginate(
    queryBuilder: SelectQueryBuilder<Entity>,
    paginationQuery: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<ResponseDto>> {
    const {
      page = 1,
      limit = 10,
      sortBy,
      sortDirection = 'DESC',
    } = paginationQuery;
    const skip = (page - 1) * limit;

    if (sortBy) {
      queryBuilder.orderBy(`${queryBuilder.alias}.${sortBy}`, sortDirection);
    }

    const [entities, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const data = entities.map((entity) => this.createResponseDto(entity));

    return new PaginatedResponseDto(data, total, page, limit);
  }
}
