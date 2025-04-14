import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('article')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  description: string;

  @Column()
  views: number;

  @Column({ name: 'is_top' })
  isTop: number;

  @Column({ name: 'tagIds' })
  tagIds: string;

  @CreateDateColumn({ name: 'create_time', type: 'timestamp' })
  createTime: Date;

  @UpdateDateColumn({ name: 'update_time', type: 'timestamp' })
  updateTime: Date;

  @Column({ default: 0 })
  status: number;

  @Column({ default: 0 })
  is_deleted: number;
}
