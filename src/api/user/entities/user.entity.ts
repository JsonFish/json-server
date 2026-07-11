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

  // 登录埋点字段
  @Column({ name: 'last_login_time', type: 'timestamp', nullable: true })
  lastLoginTime: Date | null;

  @Column({ name: 'last_login_ip', default: '-' })
  lastLoginIp: string;

  @Column({ name: 'last_login_address', default: '-' })
  lastLoginAddress: string;

  @Column({ name: 'login_count', default: 0 })
  loginCount: number;
}
