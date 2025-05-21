import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Validator } from './entities/validator.entity';
import { ValidatorService } from './validator.service';
import { ValidatorController } from './validator.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Validator])],
  providers: [ValidatorService],
  controllers: [ValidatorController]
})
export class ValidatorModule {}
