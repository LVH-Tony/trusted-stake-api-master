import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AlphaPriceListResponse,
  AlphaPriceQueryDto,
  LatestPriceQueryDto,
} from './alpha_price.dto';
import { LatestPriceService, PriceHistoryService } from './alpha_price.service';

@ApiTags('Alpha Prices')
@Controller('prices')
export class AlphaPriceController {
  constructor(
    private readonly latestPrice: LatestPriceService,
    private readonly priceHistory: PriceHistoryService,
  ) {}

  @Get('/latest')
  @ApiOperation({ summary: 'Get latest price records' })
  @ApiResponse({
    status: 200,
    description: 'List of all price records',
    type: AlphaPriceListResponse,
  })
  async getLatestPrices(
    @Query() query: LatestPriceQueryDto,
  ): Promise<AlphaPriceListResponse> {
    return this.latestPrice.findAll(query);
  }

  @Get('/')
  @ApiOperation({ summary: 'Get alpha price records' })
  @ApiResponse({
    status: 200,
    description: 'List of filtered price records',
    type: AlphaPriceListResponse,
  })
  async getFilteredRecords(
    @Query() query: AlphaPriceQueryDto,
  ): Promise<AlphaPriceListResponse> {
    return this.priceHistory.find(query);
  }
}
