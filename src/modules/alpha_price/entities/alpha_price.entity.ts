import { Entity, PrimaryColumn, Column, Index } from 'typeorm';

@Entity({ name: 'alpha_prices' })
export class AlphaPrice {
  @PrimaryColumn({ type: 'text' })
  id: string;

  @Column({ type: 'int' })
  @Index()
  height: number;

  @Column({ type: 'timestamp', nullable: true })
  timestamp: Date;

  @Column({ type: 'int' })
  net_uid: number;

  @Column({ type: 'float' })
  price_in_tao: number;
}

@Entity({ name: 'historical_alpha_prices' })
export class AlphaPriceHistory {
  @PrimaryColumn({ type: 'text' })
  id: string;

  @Column({ type: 'int' })
  @Index()
  height: number;

  @Column({ type: 'timestamp', nullable: true })
  timestamp: Date;

  @Column({ type: 'int' })
  net_uid: number;

  @Column({ type: 'float' })
  price_in_tao: number;
} 