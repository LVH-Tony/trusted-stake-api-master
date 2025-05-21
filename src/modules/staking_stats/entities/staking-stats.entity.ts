import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

class StakingStatsData {
  @PrimaryColumn({ type: 'int', name: 'net_uid' })
  @Index()
  netUid: number;

  @PrimaryColumn({ type: 'timestamp', name: 'ts_start' })
  @Index()
  tsStart: Date;

  @Column({ type: 'timestamp', name: 'ts_end' })
  @Index()
  tsEnd: Date;

  @Column({ type: 'numeric', name: 'buy_volume_tao', nullable: true })
  buyVolumeTao: number;

  @Column({ type: 'numeric', name: 'buy_volume_alpha', nullable: true })
  buyVolumeAlpha: number;

  @Column({ type: 'numeric', name: 'sell_volume_tao', nullable: true })
  sellVolumeTao: number;

  @Column({ type: 'numeric', name: 'sell_volume_alpha', nullable: true })
  sellVolumeAlpha: number;

  @Column({ type: 'numeric', name: 'total_volume_tao', nullable: true })
  totalVolumeTao: number;

  @Column({ type: 'numeric', name: 'total_volume_alpha', nullable: true })
  totalVolumeAlpha: number;

  @Column({ type: 'int', name: 'buys', nullable: true })
  buys: number;

  @Column({ type: 'int', name: 'sells', nullable: true })
  sells: number;

  @Column({ type: 'int', name: 'transactions', nullable: true })
  transactions: number;

  @Column({ type: 'int', name: 'buyers', nullable: true })
  buyers: number;

  @Column({ type: 'int', name: 'sellers', nullable: true })
  sellers: number;

  @Column({ type: 'int', name: 'traders', nullable: true })
  traders: number;
}

class StakingStatsBlocksData {
  @PrimaryColumn({ type: 'int', name: 'net_uid' })
  @Index()
  netUid: number;

  @PrimaryColumn({ type: 'int', name: 'block_start' })
  @Index()
  blockStart: number;

  @Column({ type: 'int', name: 'block_end' })
  @Index()
  blockEnd: number;

  @Column({ type: 'numeric', name: 'buy_volume_tao', nullable: true })
  buyVolumeTao: number;

  @Column({ type: 'numeric', name: 'buy_volume_alpha', nullable: true })
  buyVolumeAlpha: number;

  @Column({ type: 'numeric', name: 'sell_volume_tao', nullable: true })
  sellVolumeTao: number;

  @Column({ type: 'numeric', name: 'sell_volume_alpha', nullable: true })
  sellVolumeAlpha: number;

  @Column({ type: 'numeric', name: 'total_volume_tao', nullable: true })
  totalVolumeTao: number;

  @Column({ type: 'numeric', name: 'total_volume_alpha', nullable: true })
  totalVolumeAlpha: number;

  @Column({ type: 'int', name: 'buys', nullable: true })
  buys: number;

  @Column({ type: 'int', name: 'sells', nullable: true })
  sells: number;

  @Column({ type: 'int', name: 'transactions', nullable: true })
  transactions: number;

  @Column({ type: 'int', name: 'buyers', nullable: true })
  buyers: number;

  @Column({ type: 'int', name: 'sellers', nullable: true })
  sellers: number;

  @Column({ type: 'int', name: 'traders', nullable: true })
  traders: number;
}

@Entity({ name: 'staking_stats_1min' })
export class StakingStats_1Min extends StakingStatsData {}

@Entity({ name: 'staking_stats_5min' })
export class StakingStats_5Min extends StakingStatsData {}

@Entity({ name: 'staking_stats_daily' })
export class StakingStats_Daily extends StakingStatsData {}

@Entity({ name: 'staking_stats_weekly' })
export class StakingStats_Weekly extends StakingStatsData {}

@Entity({ name: 'staking_stats_monthly' })
export class StakingStats_Monthly extends StakingStatsData {}

@Entity({ name: 'staking_stats_blocks' })
export class StakingStats_Blocks extends StakingStatsBlocksData {} 