import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column({ default: '' })
  password: string;

  @Column({ default: '-' })
  email: string;

  @Column({ default: 0 })
  role: number;

  @Column()
  avatar: string;

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  update_time: Date;

  @Column({ default: 0 })
  status: number;

  @Column()
  ip: string;

  @Column({ name: 'ip_address' })
  ipAddress: string;

  @Column({ name: 'github_id', default: '' })
  githubId: string;
}
