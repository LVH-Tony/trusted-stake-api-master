import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'subnet_infos' })
export class SubnetInfo {
  @PrimaryColumn('text', { unique: true })
  id: string;

  @Column('int4')
  @Index()
  height: number;

  @Column('timestamp', { nullable: true })
  timestamp: Date;

  @Column('int4')
  @Index()
  net_uid: number;

  @Column('text')
  owner_hotkey: string;

  @Column('text')
  owner_coldkey: string;

  @Column('text')
  subnet_name: string;

  @Column('text')
  token_symbol: string;

  @Column('int4')
  network_registered_at: number;

  @Column('int4')
  tempo: number;

  @Column('int4')
  last_step: number;

  @Column('int4')
  blocks_since_last_step: number;

  @Column('numeric')
  emission: number;

  @Column('numeric')
  alpha_in: number;

  @Column('numeric')
  alpha_out: number;

  @Column('numeric')
  tao_in: number;

  @Column('numeric')
  alpha_in_emission: number;

  @Column('numeric')
  alpha_out_emission: number;

  @Column('numeric')
  tao_in_emission: number;

  @Column('numeric')
  pending_alpha_emission: number;

  @Column('numeric')
  pending_root_emission: number;

  @Column('numeric')
  subnet_volume: number;
}
