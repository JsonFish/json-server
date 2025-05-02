import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('chat_message')
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  avatar: string;

  @Column()
  username: string;

  @Column()
  message: string;

  @Column()
  ip: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createTime: Date;

  @Column({ default: 0 })
  status: number;
}
