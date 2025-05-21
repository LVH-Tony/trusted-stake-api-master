import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'subnet_identities' })
export class SubnetIdentity {
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
  subnet_name: string;

  @Column('text')
  github_repo: string;

  @Column('text')
  subnet_contact: string;

  @Column('text')
  subnet_url: string;

  @Column('text')
  discord: string;

  @Column('text')
  description: string;

  @Column('text')
  additional: string;
}
