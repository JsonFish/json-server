import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/api/user/entities/user.entity';

@Entity('message')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  text: string;

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;

  @Column({ default: 0 })
  status: number;
}
