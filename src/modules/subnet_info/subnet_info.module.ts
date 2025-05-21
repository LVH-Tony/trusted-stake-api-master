import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubnetInfo } from './entities/subnet_info.entity';
import { SubnetInfoController } from './subnet_info.controller';
import { SubnetInfoService } from './subnet_info.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubnetInfo])],
  providers: [SubnetInfoService],
  controllers: [SubnetInfoController],
})
export class SubnetInfoModule {}
