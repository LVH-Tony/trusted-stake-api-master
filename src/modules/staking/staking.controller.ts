import { Controller, Get, Query, Param, Res, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiOkResponse,
} from '@nestjs/swagger';
import { StakingService } from './staking.service';
import {
  StakingResponseDto,
  PaginatedStakingResponseDto,
  StakingQueryDto,
} from './staking.dto';
import { Response } from 'express';

@ApiTags('Staking')
@Controller('staking')
export class StakingController {
  constructor(private readonly stakingService: StakingService) {}

  @Get()
  @ApiOperation({
    summary: 'Get paginated staking records',
    description:
      'Retrieve staking/unstaking records with filtering and pagination',
  })
  @ApiOkResponse({ type: PaginatedStakingResponseDto })
  async findAll(
    @Query() query: StakingQueryDto,
  ): Promise<PaginatedStakingResponseDto> {
    return this.stakingService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get staking record by ID',
    description:
      'Retrieve a specific staking/unstaking record by its unique identifier',
  })
  @ApiParam({ name: 'id', description: 'Staking record ID' })
  @ApiOkResponse({ type: StakingResponseDto })
  @ApiResponse({ status: 404, description: 'Record not found' })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const record = await this.stakingService.findOne(id);
    if (!record) res.status(HttpStatus.NOT_FOUND);
    else res.status(HttpStatus.OK).json(record);
  }
}
