import {BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import Event from './Event';
import Comment from './Comment';
import {UserReponse} from '../service/types';

/**
 * 사용자!
 */
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({comment: '식별자.'})
  id: number;

  @Column({comment: '가입한 이메일.'})
  email: string;

  @Column({comment: '사용자 닉네임.'})
  nickname: string;

  @Column({comment: '로그인한 방법(카카오, 구글 등).'})
  oauthProvider: string;

  @Column({comment: 'OAuth로 로그인한 경우, provider가 제공한 식별자.'})
  oauthId: string;

  @Column({comment: '자동로그인용 토큰.'})
  rememberMeToken: string;

  @CreateDateColumn({comment: '생성 일시.'})
  createdAt: Date;

  @OneToMany(() => Event, (e) => e.user)
  events: Event[];

  @OneToMany(() => Comment, (c) => c.user)
  comments: Comment[];

  toResponse(): UserReponse {
    return {
      id: this.id,
      email: this.email,
      nickname: this.nickname,
    }
  }
}

export default User;
