import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

class OhlcData {
  @PrimaryColumn({ type: 'timestamp', name: 'start_time' })
  @Index()
  startTime: Date;

  @PrimaryColumn({ type: 'int', name: 'net_uid' })
  @Index()
  netUid: number;

  @PrimaryColumn({ type: 'timestamp', name: 'end_time' })
  endTime: Date;

  @Column({ type: 'float', name: 'open' })
  open: number;

  @Column({ type: 'float', name: 'high' })
  high: number;

  @Column({ type: 'float', name: 'low' })
  low: number;

  @Column({ type: 'float', name: 'close' })
  close: number;
}

@Entity({ name: 'ohlc_1min' })
export class Ohlc_1Min extends OhlcData {}

@Entity({ name: 'ohlc_5min' })
export class Ohlc_5Min extends OhlcData {}

@Entity({ name: 'ohlc_15min' })
export class Ohlc_15Min extends OhlcData {}

@Entity({ name: 'ohlc_60min' })
export class Ohlc_60Min extends OhlcData {}

@Entity({ name: 'ohlc_1day' })
export class Ohlc_1Day extends OhlcData {} 