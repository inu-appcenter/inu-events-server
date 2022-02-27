import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import Event from './Event';
import Comment from './Comment';
import {Infer} from '../common/utils/zod';
import EventNotification from './EventNotification';
import EventLike from './EventLike';
import {log} from '../common/utils/log';
import {UserResponseScheme} from './schemes';
import ImageUrlService from '../service/ImageUrlService';
import BaseBetterEntity from '../common/base/BaseBetterEntity';

/**
 * 사용자!
 */
@Entity()
export default class User extends BaseBetterEntity {
  @PrimaryGeneratedColumn({comment: '식별자.'})
  id: number;

  @Column({comment: '가입한 이메일.'})
  email: string;

  @Column({comment: '사용자 닉네임.'})
  nickname: string;

  @Column({type: String, nullable: true, comment: '사용자 프로필 사진 UUID.'})
  imageUuid?: string | null;

  @Column({comment: '로그인한 방법(카카오, 구글 등).'})
  oauthProvider: string;

  @Column({comment: 'OAuth로 로그인한 경우, provider가 제공한 식별자.'})
  oauthId: string;

  @Column({comment: '자동로그인용 토큰.'})
  rememberMeToken: string;

  @Column({type: String, nullable: true, comment: 'FCM 토큰.'})
  fcmToken?: string | null;

  @Column({comment: '전체 알림 수신 여부.'})
  subscribing: boolean = false;

  @Column({type: String, nullable: true, comment: '전체 알림 카테고리 필터(쉼표로 구분).'})
  subscribingOn?: string | null;

  @CreateDateColumn({comment: '생성 일시.'})
  createdAt: Date;

  @Column({type: Date, nullable: true, comment: '삭제 일시.'})
  deletedAt?: Date | null;

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

  /**
   * 이 사용자가 이 이벤트의 알림을 수신해야 할까?
   *
   * @param event 판단의 기준이 될 이벤트.
   */
  shallThisUserBeNotifiedWithThisEvent(event: Event): boolean {
    const thisTopic = event.category;
    const wantNotifications = this.getSubscription();
    const topicsInterestedIn = this.getTopics();

    if (!wantNotifications) {
      // 구독 안함!
      return false;
    }

    if (topicsInterestedIn.length === 0) {
      // 구독 하는데 키워드 명시 안함: 설정을 안했네 그냥 보내지마.
      return false;
    }

    // 지금 이 이벤트의 카테고리가 내래 구독중인 카테고리 중에 있능가??>??
    // 그니께...이것이 내가 구독중인 카테고리인가 ???
    return topicsInterestedIn.includes(thisTopic);
  }

  setFcmToken(token: string) {
    this.fcmToken = token;
  }

  async toResponse(): Promise<Infer<typeof UserResponseScheme>> {
    return {
      id: this.id,
      email: this.email,
      nickname: this.nickname,
      imageUuid: this.imageUuid,
      imageUrl: await ImageUrlService.makeUrl(this.imageUuid),
    }
  }
}
