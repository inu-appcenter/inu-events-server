import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import User from './User'
import Comment from './Comment'
import BlockedList from './BlockedList'
import {Infer} from '../common/utils/zod';
import LikeService from '../service/LikeService';
import EventLike from './EventLike';
import EventNotification from './EventNotification';
import {EventResponseScheme} from './schemes';
import NotificationService from '../service/NotificationService';
import ImageUrlService from '../service/ImageUrlService'
import BaseBetterEntity from '../common/base/BaseBetterEntity';

@Entity()
export default class Event extends BaseBetterEntity {
  static relations = ['user', 'comments', 'likes', 'notifications', 'user.BlockedList'];

  @PrimaryGeneratedColumn({comment: '식별자.'})
  id: number

  @ManyToOne(() => User, (u) => u.events)
  @JoinColumn()
  user: User;

  /**
   * 1페이지에 노출
   */

  @Column({comment: '제목.'})
  title: string;

  @Column({type: String, nullable: true, comment: '단체. 이 행사 또는 모집을 여는 주체가 누구인가?'})
  host?: string | null;

  @Column({comment: '분류.'})
  category: string;

  @Column({comment: '대상. 이 행사 또는 모집은 누구를 대상으로 하는 것인가?'})
  target: string;

  @Column({comment: '행사 시작 일시.'})
  startAt: Date;

  @Column({type: Date, nullable: true, comment: '행사 종료 일시(없을 수 있음).'})
  endAt?: Date | null;

  @Column({type: String, nullable: true, comment: '연락처. 궁금한 부분은 어디로 연락하면 되나?(휴대전화번호, 이메일 등등)'})
  contact?: string | null;

  @Column({type: String, nullable: true, comment: '위치. 장소 또는 링크.'})
  location?: string | null;

  /**
   * 2페이지에 노출
   */

  @Column({comment: '본문.', length: 1000})
  body: string;

  @Column({type: String, nullable: true, comment: '이미지 식별자.'})
  imageUuid?: string | null;


  @Column({comment: '조회수'})
  views: number = 0;

  @CreateDateColumn({comment: '생성 일시.'})
  createdAt: Date;

  /**
   * 이 행사에 딸린 댓글들.
   */
  @OneToMany(() => Comment, (c) => c.event)
  comments: Comment[];

  /**
   * 이 행사에 딸린 "좋아요"들.
   */
  @OneToMany(() => EventLike, (l) => l.event)
  likes: EventLike[];

  /**
   * 이 행사에 딸린 등록된 알림들.
   */
  @OneToMany(() => EventNotification, (n) => n.event)
  notifications: EventNotification[];

  hit() {
    this.views += 1;
  }

  async toResponse(userId?: number): Promise<Infer<typeof EventResponseScheme>> {
    return {
      id: this.id,
      userId: this.user.id,
      nickname: this.user.nickname,
      profileImage: await ImageUrlService.makeUrl(this.user.imageUuid),
      title: this.title,
      host: this.host,
      category: this.category,
      target: this.target,
      startAt: this.startAt,
      endAt: this.endAt,
      contact: this.contact,
      location: this.location,

      body: this.body,
      imageUuid: this.imageUuid,
      imageUrl: await ImageUrlService.makeUrl(this.imageUuid),
      createdAt: this.createdAt,

      wroteByMe: userId ? this.user.id === userId : undefined,
      likedByMe: userId ? await LikeService.getLike(userId, this.id) : undefined,
      notificationSetByMe: userId ? (await NotificationService.getUnSentNotification(userId, this.id)) != null : undefined,
      notificationSetFor: userId ? (await NotificationService.getUnSentNotification(userId, this.id))?.setFor : undefined,

      comments: this.comments.length,
      views: this.views,
      likes: this.likes.length,
      notifications: this.notifications.length,
    }
  }
}
