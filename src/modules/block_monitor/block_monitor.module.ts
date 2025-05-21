import { Module } from '@nestjs/common';
import { BlockMonitorService } from './block_monitor.service';

@Module({
  providers: [BlockMonitorService],
})
export class BlockMonitorModule {}
