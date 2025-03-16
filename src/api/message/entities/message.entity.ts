import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/api/user/entities/user.entity';

@Entity('message')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  userInfo: User;

  @CreateDateColumn({ name: 'create_time', type: 'timestamp' })
  createTime: Date;

  @Column({ default: 0 })
  status: number;

  @Column({ name: 'browser_name' })
  browserName: string;

  @Column({ name: 'browser_version' })
  browserVersion: string;

  @Column({ name: 'os_name' })
  osName: string;

  @Column({ name: 'os_version' })
  osVersion: string;

  @Column()
  ip: string;

  @Column({ name: 'ip_address' })
  ipAddress: string;
}
