import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staking } from './entities/staking.entity';
import { StakingService } from './staking.service';
import { StakingController } from './staking.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Staking])],
  controllers: [StakingController],
  providers: [StakingService],
})
export class StakingModule {}
