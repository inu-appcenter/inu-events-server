import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import User from './User'
import Comment from './Comment'
import EventLike from './EventLike';
import EventNotification from './EventNotification';
import {ReportResponseScheme} from './schemes';
import BaseBetterEntity from '../common/base/BaseBetterEntity';

@Entity()
export default class Report extends BaseBetterEntity {
  static relations = ['user', 'event'];

  @PrimaryGeneratedColumn({comment: '신고한 사용자 id.'})
  id: number;

  @Column({comment: '신고한 사용자 이메일.'})
  email: string;

  @Column({comment: '신고한 사용자 닉네임.'})
  nickname: string;

  @Column({type: String, nullable: true, comment: '신고한 사용자 프로필 사진 UUID.'})
  profileImage?: string | null;

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


  @Column({comment: '조회수.'})
  views: number = 0;

  @CreateDateColumn({comment: '생성 일시.'})
  createdAt: Date;

  @ManyToOne(() => User, (u) => u.events)
  @JoinColumn()
  user: User;

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


//   async toResponse(userId?: number): Promise<Infer<typeof ReportResponseScheme>> {
//     return {
//       userId: this.user.id,
//       email: this.user.email,
//       nickname: this.user.nickname,
//       title: this.title,
//       host: this.host,
//       category: this.category,
//       target: this.target,
//       startAt: this.startAt,
//       endAt: this.endAt,
//       contact: this.contact,
//       location: this.location,

//       body: this.body,
//       imageUuid: this.imageUuid,
//       createdAt: this.createdAt,
//       id:this.id,

//       comments: (await CommentService.getComments(this.id, userId)).length,
//       views: this.views,
//       likes: this.likes.length,
//       notifications: this.notifications.length,
//     }
//   }
}
