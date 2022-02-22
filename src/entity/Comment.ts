import {z} from 'zod';
import User from './User';
import Event from './Event';
import {Infer} from '../common/utils/zod';
import {BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn({comment: '식별자.'})
  id: number;

  @ManyToOne(() => User, (u) => u.comments)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Event, (e) => e.comments, {onDelete:'CASCADE'})
  @JoinColumn()
  event: Event;

  @Column({comment: '본문.', length: 1000})
  content: string;

  @CreateDateColumn({comment: '생성 일시.'})
  createdAt: Date;

  toCommentResponse(userId?: number): Infer<typeof CommentResponseScheme> {
    return {
      id: this.id,
      userId: this.user.id,
      nickname: this.user.nickname,
      profileImage: this.user.imageUuid ? `http://uniletter.inuappcenter.kr/images/${this.user.imageUuid}` : undefined,

      eventId: this.event.id,
      content: this.content,
      createdAt: this.createdAt,
      wroteByMe: userId ? this.user.id == userId : undefined
    }
  }
}

export const CommentResponseScheme = {
  id: z.number(),
  userId: z.number(),
  nickname: z.string(),
  profileImage: z.string().optional(),
  eventId: z.number(),
  content: z.string(),
  createdAt: z.date(),
  wroteByMe: z.boolean().optional()
};
