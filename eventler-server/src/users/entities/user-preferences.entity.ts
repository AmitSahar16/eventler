import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity('user_preferences')
export class UserPreferences {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ nullable: true })
  budget: number;

  @Column({ nullable: true })
  location: string;

  @Column({ name: 'event_type', nullable: true })
  eventType: string;

  @Column({ nullable: true })
  atmosphere: string;

  @Column({ nullable: true })
  transportation: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToOne(() => User, (user) => user.preferences)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
