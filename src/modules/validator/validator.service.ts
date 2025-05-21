import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Validator } from './entities/validator.entity';
import { PaginationService } from '@/base/pagination/pagination.service';
import {
  PaginatedValidatorResponseDto,
  ValidatorQueryDto,
  ValidatorResponseDto,
} from './validator.dto';

@Injectable()
export class ValidatorService extends PaginationService<
  Validator,
  ValidatorResponseDto
> {
  private readonly sortableColumns = ['net_uid', 'active'];
  constructor(
    @InjectRepository(Validator)
    private readonly validatorRepo: Repository<Validator>,
  ) {
    super();
  }

  async findAll(
    query: ValidatorQueryDto,
  ): Promise<PaginatedValidatorResponseDto> {
    const { net_uid, hotkey, active, sortBy = 'net_uid' } = query;

    // Validate sortBy parameter
    if (!this.sortableColumns.includes(sortBy)) {
      throw new BadRequestException(
        `Invalid sort field: ${sortBy}. ` +
          `Allowed values: ${this.sortableColumns.join(', ')}`,
      );
    }

    const queryBuilder = this.validatorRepo.createQueryBuilder('v').select();

    if (net_uid !== undefined)
      queryBuilder.andWhere('v.net_uid = :net_uid', { net_uid });

    if (hotkey) queryBuilder.andWhere('v.hotkey = :hotkey', { hotkey });

    if (active) queryBuilder.andWhere('v.active = :active', { active });

    return this.paginate(queryBuilder, { ...query, sortBy });
  }

  protected getRepository(): Repository<Validator> {
    return this.validatorRepo;
  }

  protected createResponseDto(entity: Validator): ValidatorResponseDto {
    return ValidatorResponseDto.fromEntity(entity);
  }
}
