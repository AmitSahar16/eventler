import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Group } from '../../groups/entities/group.entity';
import { EventType, EventStatus } from '../enums/event.enums';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'creator_id' })
  creatorId: string;

  @Column({ name: 'group_id', nullable: true })
  groupId: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  type: EventType;

  @Column({
    type: 'varchar',
    length: 50,
  })
  status: EventStatus;

  @Column({ nullable: true })
  budget: number;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  date: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @ManyToOne(() => Group, { nullable: true })
  @JoinColumn({ name: 'group_id' })
  group: Group;
}
