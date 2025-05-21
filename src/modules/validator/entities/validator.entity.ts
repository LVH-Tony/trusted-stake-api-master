import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'subnet_validators' })
export class Validator {
  @PrimaryColumn({ type: 'text', unique: true })
  id: string;

  @Column({ type: 'int4', name: 'height' })
  height: number;

  @Column({ type: 'timestamp', precision: 6, name: 'timestamp' })
  timestamp: Date;

  @Column({ type: 'int4', name: 'net_uid' })
  net_uid: number;

  @Column({ type: 'int4', name: 'uid' })
  uid: number;

  @Column({ type: 'text', name: 'validator' })
  hotkey: string;

  @Column({ type: 'text', name: 'owner' })
  owner: string;

  @Column({ type: 'boolean', name: 'active' })
  active: boolean;
}
