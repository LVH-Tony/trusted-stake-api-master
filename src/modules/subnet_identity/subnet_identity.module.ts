import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubnetIdentity } from './entities/subnet_identity.entity';
import { SubnetIdentityService } from './subnet_identity.service';
import { SubnetIdentityController } from './subnet_identity.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SubnetIdentity])],
  controllers: [SubnetIdentityController],
  providers: [SubnetIdentityService],
})
export class SubnetIdentityModule {}
