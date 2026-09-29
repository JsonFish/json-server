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

  /** English title for i18n; empty means not translated yet. */
  @Column({ name: 'title_en', default: '' })
  titleEn: string;

  /** Public, stable identifier used in blog URLs. */
  @Column({ unique: true })
  slug: string;

  /** `post` is a long-form article; `note` is a short note. */
  @Column({ default: 'post' })
  type: 'post' | 'note';

  @Column()
  description: string;

  /** English description for i18n. */
  @Column({ name: 'description_en', default: '' })
  descriptionEn: string;

  @Column()
  content: string;

  /** English content for i18n; NULL means not translated yet. */
  @Column({ name: 'content_en', type: 'longtext', nullable: true })
  contentEn: string | null;

  @Column()
  views: number;

  @Column({ name: 'is_top' })
  isTop: number;

  @Column({ name: 'tag_ids' })
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
