import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StakingStatsController } from './staking_stats.controller';
import { StakingStatsService } from './staking_stats.service';
import {
  StakingStats_1Min,
  StakingStats_5Min,
  StakingStats_Daily,
  StakingStats_Weekly,
  StakingStats_Monthly,
  StakingStats_Blocks,
} from './entities/staking-stats.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StakingStats_1Min,
      StakingStats_5Min,
      StakingStats_Daily,
      StakingStats_Weekly,
      StakingStats_Monthly,
      StakingStats_Blocks,
    ]),
  ],
  providers: [StakingStatsService],
  controllers: [StakingStatsController],
})
export class StakingStatsModule {} 