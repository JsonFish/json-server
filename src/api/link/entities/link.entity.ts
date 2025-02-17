import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('links')
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  update_time: Date;

  @Column({ default: 0 })
  status: string;
}
