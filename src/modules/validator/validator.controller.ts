import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ValidatorService } from './validator.service';
import { Controller, Get, Query } from '@nestjs/common';
import {
  PaginatedValidatorResponseDto,
  ValidatorQueryDto,
} from './validator.dto';

@ApiTags('Validators')
@Controller('validators')
export class ValidatorController {
  constructor(private readonly validatorService: ValidatorService) {}

  @Get()
  @ApiOperation({
    summary: 'Get validator records on subnets',
    description:
      'Returns the list of validators registered and allowed on subnets',
  })
  @ApiOkResponse({ type: PaginatedValidatorResponseDto })
  async findAll(
    @Query() query: ValidatorQueryDto,
  ): Promise<PaginatedValidatorResponseDto> {
    return this.validatorService.findAll(query);
  }
}
