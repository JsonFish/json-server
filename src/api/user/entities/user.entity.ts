import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  email: string;
  @Column()
  role: number;
  @Column()
  avatar: string;
  @Column()
  create_time: string;
  @Column()
  update_time: string;
  @Column()
  status: string;
  @Column()
  ip: string;
  @Column()
  ipAddress: string;
  @Column()
  github_id: string;
}
