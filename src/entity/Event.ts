import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm'
import {User} from './User'
import Comment from './Comment'
import {EventResponse} from '../service/types'

@Entity()
export default class Event extends BaseEntity {
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

  @Column({comment: '단체. 이 행사 또는 모집을 여는 주체가 누구인가?'})
  host: string;

  @Column({comment: '분류.'})
  category: string;

  @Column({comment: '대상. 이 행사 또는 모집은 누구를 대상으로 하는 것인가?'})
  target: string;

  @Column({comment: '행사 시작 일시.'})
  startAt: Date;

  @Column({nullable: true, comment: '행사 종료 일시(없을 수 있음).'})
  endAt?: Date;

  @Column({nullable: true, comment: '연락처. 궁금한 부분은 어디로 연락하면 되나?(휴대전화번호, 이메일 등등)'})
  contact?: string;

  @Column({nullable: true, comment: '위치. 장소 또는 링크.'})
  location?: string;

  /**
   * 2페이지에 노출
   */

  @Column({comment: '본문.', length: 1000})
  body: string;

  @Column({nullable: true, comment: '이미지 식별자.'})
  imageUuid?: string;


  @CreateDateColumn({comment: '생성 일시.'})
  createdAt: Date;

  @OneToMany(() => Comment, (c) => c.event)
  comments: Comment[];

  toEventResponse(userId?: number): EventResponse {
    return {
      id: this.id,
      userId: this.user.id,
      nickname: this.user.nickname,
      profileImage: this.user.imageUuid ? `http://uniletter.inuappcenter.kr/images/${this.user.imageUuid}` : undefined,

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

      createdAt: this.createdAt,
      wroteByMe: userId ? this.user.id == userId : undefined,

      submissionUrl: this.location, // TODO 하위호환 필드
    }
  }
}
