import {
  Ohlc_15Min,
  Ohlc_1Day,
  Ohlc_1Min,
  Ohlc_5Min,
  Ohlc_60Min,
} from './entities/ohlc.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OhlcController } from './ohlc.controller';
import { OhlcService } from './ohlc.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ohlc_1Min,
      Ohlc_5Min,
      Ohlc_15Min,
      Ohlc_60Min,
      Ohlc_1Day,
    ]),
  ],
  providers: [OhlcService],
  controllers: [OhlcController],
})
export class OhlcModule {}
