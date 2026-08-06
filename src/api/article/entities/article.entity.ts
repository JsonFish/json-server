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

  /** Public, stable identifier used in blog URLs. */
  @Column({ unique: true })
  slug: string;

  /** `post` is a long-form article; `note` is a short note. */
  @Column({ default: 'post' })
  type: 'post' | 'note';

  @Column()
  content: string;

  @Column()
  description: string;

  @Column()
  views: number;

  @Column({ name: 'is_top' })
  isTop: number;

  @Column()
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
