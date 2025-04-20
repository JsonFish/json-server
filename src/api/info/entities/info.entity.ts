import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('information')
export class Information {
  @PrimaryGeneratedColumn({ name: 'blog_name' })
  blogName: string;

  @Column({ name: 'blog_avatar' })
  blogAvatar: string;

  @Column({ name: 'gitee_link' })
  giteeLink: string;

  @Column({ name: 'github_link' })
  githubLink: string;

  @Column({ name: 'juejin_link' })
  juejinLink: string;

  @Column({ name: 'csdn_link' })
  csdnLink: string;

  @Column({ name: 'bilibili_link' })
  bilibiliLink: string;
}
