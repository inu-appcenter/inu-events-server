import {BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import Event from './Event';
import Comment from './Comment';
import {z} from 'zod';
import {Infer} from '../common/utils/zod';
import EventNotification from './EventNotification';
import EventLike from './EventLike';
import {log} from '../common/utils/log';

/**
 * 사용자!
 */
@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn({comment: '식별자.'})
  id: number;

  @Column({comment: '가입한 이메일.'})
  email: string;

  @Column({comment: '사용자 닉네임.'})
  nickname: string;

  @Column({nullable: true, comment: '사용자 프로필 사진 UUID.'})
  imageUuid?: string;

  @Column({comment: '로그인한 방법(카카오, 구글 등).'})
  oauthProvider: string;

  @Column({comment: 'OAuth로 로그인한 경우, provider가 제공한 식별자.'})
  oauthId: string;

  @Column({comment: '자동로그인용 토큰.'})
  rememberMeToken: string;

  @Column({nullable: true, comment: 'FCM 토큰.'})
  fcmToken?: string;

  @Column({comment: '전체 알림 수신 여부.'})
  subscribing: boolean = false;

  @Column({nullable: true, comment: '전체 알림 카테고리 필터(쉼표로 구분).'})
  subscribingOn?: string;

  @CreateDateColumn({comment: '생성 일시.'})
  createdAt: Date;

  @Column({nullable: true, comment: '삭제 일시.'})
  deletedAt?: Date;

  /**
   * 사용자가 등록한 행사들.
   */
  @OneToMany(() => Event, (e) => e.user)
  events: Event[];

  /**
   * 사용자가 남긴 댓글들.
   */
  @OneToMany(() => Comment, (c) => c.user)
  comments: Comment[];

  /**
   * 사용자가 남긴 "좋아요"들(또는 저장한 행사들).
   */
  @OneToMany(() => EventLike, (l) => l.user)
  likes: EventLike[];

  /**
   * 사용자가 등록한 행사 오픈/마감 알림들.
   */
  @OneToMany(() => EventNotification, (n) => n.event)
  notifications: EventNotification[];

  getSubscription() {
    return this.subscribing;
  }

  setSubscription(subscribing: boolean) {
    if (subscribing) {
      log(`이제 ${this.toString()}는 새 글 알림을 받습니다.`);
    } else {
      log(`이제 ${this.toString()}는 새 글 알림을 받지 않습니다.`);
    }

    this.subscribing = subscribing;
  }

  getTopics() {
    return this.subscribingOn?.split(',')?.map(t => t.trim()) ?? [];
  }

  setTopics(topics: string[]) {
    log(`이제 ${this.toString()}는 다음 주제에 대해 관심을 가집니다: ${topics}`);

    this.subscribingOn = topics.join(', ');
  }

  shallThisUserBeNotifiedWithThisEvent(event: Event): boolean {
    // 이 사용자가 이 이벤트의 알림을 수신해야 할까?

    if (!this.subscribing) {
      // 구독 안함!
      return false;
    }

    if (this.subscribingOn == null) {
      // 구독 하는데 키워드 명시 안함: 다 받음.
      return true;
    }

    // 구독 중인 카테고리별 알림
    const subscribingCategories = this.subscribingOn.split(',').map(k => k.trim());
    const thisCategory = event.category;

    // 지금 이 이벤트의 카테고리가 내래 구독중인 카테고리 중에 있능가??>??
    // 그니께...이것이 내가 구독중인 카테고리인가 ???
    return subscribingCategories.includes(thisCategory);
  }

  toString() {
    return `[id가 ${this.id}인 사용자]`;
  }

  toResponse(): Infer<typeof UserResponseScheme> {
    return {
      id: this.id,
      email: this.email,
      nickname: this.nickname,
      imageUuid: this.imageUuid,
    }
  }
}

export const UserResponseScheme = {
  id: z.number(),
  email: z.string(),
  nickname: z.string(),
  imageUuid: z.string().optional(),
}
