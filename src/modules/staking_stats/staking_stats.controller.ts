import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TemporalQueryDto, BlockQueryDto } from './staking_stats.dto';
import { StakingStatsService } from './staking_stats.service';
import { PaginatedResponseDto } from '@/base/pagination/pagination.dto';

@ApiTags('Staking Stats')
@Controller('staking/stats')
export class StakingStatsController {
  constructor(private readonly statsService: StakingStatsService) {}

  @Get('temporal')
  @ApiOperation({ summary: 'Get staking stats with time-based resolution' })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated staking stats data',
    type: PaginatedResponseDto,
  })
  async getTemporalStats(@Query() query: TemporalQueryDto): Promise<PaginatedResponseDto<any>> {
    return this.statsService.getTemporalStats(query);
  }

  @Get('blocks')
  @ApiOperation({ summary: 'Get staking stats with block-based resolution' })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated block-based staking stats data',
    type: PaginatedResponseDto,
  })
  async getBlockStats(@Query() query: BlockQueryDto): Promise<PaginatedResponseDto<any>> {
    return this.statsService.getBlockStats(query);
  }
} 