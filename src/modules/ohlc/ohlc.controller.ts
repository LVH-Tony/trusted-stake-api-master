import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OhlcQueryDto, OhlcResponseDto } from './ohlc.dto';
import { OhlcService } from './ohlc.service';

@ApiTags('OHLC data')
@Controller('udf')
export class OhlcController {
  constructor(private readonly ohlcService: OhlcService) {}

  @Get('/history')
  @ApiOperation({ summary: 'Returns the OHLC data for trading views' })
  @ApiResponse({
    status: 200,
    description: 'OHLC data for trading view charts',
    type: OhlcResponseDto,
  })
  async getHistoryData(@Query() query: OhlcQueryDto): Promise<OhlcResponseDto> {
    return this.ohlcService.getHistoryData(query);
  }
}
