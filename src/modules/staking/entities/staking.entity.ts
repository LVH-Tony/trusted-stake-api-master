import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'stakings' })
export class Staking {
  @PrimaryColumn('text', { unique: true })
  id: string;

  @Column('int4')
  @Index()
  height: number;

  @Column('timestamp', { nullable: true })
  timestamp: Date;

  @Column('int4', { nullable: true })
  extrinsic_id: number;

  @Column('text')
  coldkey: string;

  @Column('text')
  hotkey: string;

  @Column('int4')
  net_uid: number;

  @Column('numeric')
  tao: number;

  @Column('numeric')
  alpha: number;

  @Column('varchar', { length: 16 })
  action: string;
}
