import { ISession } from 'connect-typeorm';
import { Column, DeleteDateColumn, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'sessions'})
export class SessionEntity implements ISession {
  @Index()
  @Column("bigint")
  @DeleteDateColumn()
  expiredAt = Date.now();

  @DeleteDateColumn()
  @PrimaryColumn('varchar', { length: 255 })
  id = '';

  @DeleteDateColumn()
  @Column('text')
  json = '';
}
