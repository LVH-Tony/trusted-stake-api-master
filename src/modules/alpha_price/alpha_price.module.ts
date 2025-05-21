import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlphaPrice, AlphaPriceHistory } from './entities/alpha_price.entity';
import { LatestPriceService, PriceHistoryService } from './alpha_price.service';
import { AlphaPriceController } from './alpha_price.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AlphaPrice, AlphaPriceHistory])],
  providers: [PriceHistoryService, LatestPriceService],
  controllers: [AlphaPriceController],
})
export class AlphaPriceModule {}
