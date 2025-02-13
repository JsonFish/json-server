import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ default: '' })
  password: string;

  @Column()
  email: string;

  @Column({ default: 1 })
  role: number;

  @Column()
  avatar: string;

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  update_time: Date;

  @Column({ default: 0 })
  status: string;

  @Column()
  ip: string;

  @Column()
  ipAddress: string;

  @Column()
  github_id: string;
}
