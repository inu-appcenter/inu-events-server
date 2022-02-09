import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {User} from './User';
import {JoinColumn} from 'typeorm';
import Comment from './Comment';
import {EventResponse} from '../service/types';

@Entity()
export default class Event extends BaseEntity {
  @PrimaryGeneratedColumn({comment: '식별자.'})
  id: number;

  @ManyToOne(() => User, (u) => u.events)
  @JoinColumn()
  user: User;

  @Column({comment: '단체.'})
  host: string;

  @Column({comment: '분류.'})
  category: string;

  @Column({comment: '제목.'})
  title: string;

  @Column({comment: '본문.'})
  body: string;

  @Column({nullable: true, comment: '이미지 식별자.'})
  imageUuid?: string;

  @Column({nullable: true, comment: '신청 URL.'})
  submissionUrl?: string;

  @Column({nullable: true, comment: '행사 시작 일시.'})
  startAt?: Date;

  @Column({nullable: true, comment: '행사 종료 일시.'})
  endAt?: Date;

  @CreateDateColumn({comment: '생성 일시.'})
  createdAt: Date;

  @OneToMany(() => Comment, (c) => c.event)
  comments: Comment[];

  toEventResponse(userId?: number): EventResponse {
    return {
      id: this.id,
      userId: this.user.id,
      host: this.host,
      category: this.category,
      title: this.title,
      body: this.body,
      imageUuid: this.imageUuid,
      submissionUrl: this.submissionUrl,
      startAt: this.startAt,
      endAt: this.endAt,
      createdAt: this.createdAt,
      wroteByMe: userId ? this.user.id == userId : undefined
    }
  }
}
