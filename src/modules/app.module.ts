import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SubnetInfoModule } from './subnet_info';
import { StakingModule } from './staking';
import { AlphaPriceModule } from './alpha_price';
import { BlockMonitorModule } from './block_monitor';
import { SubnetIdentityModule } from './subnet_identity';
import { ValidatorModule } from './validator';
import { OhlcModule } from './ohlc';
import { StakingStatsModule } from './staking_stats';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        schema: configService.get<string>('DB_SCHEMA'),
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: false,
      }),
    }),
    ScheduleModule.forRoot(),
    SubnetInfoModule,
    StakingModule,
    AlphaPriceModule,
    BlockMonitorModule,
    SubnetIdentityModule,
    ValidatorModule,
    OhlcModule,
    StakingStatsModule,
  ],
})
export class AppModule {}
