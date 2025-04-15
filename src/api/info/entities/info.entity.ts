import { Entity, Column } from 'typeorm';

@Entity('information')
export class Information {
  @Column({ name: 'blog_name' })
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
}
