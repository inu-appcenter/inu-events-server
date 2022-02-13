import {BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import Event from './Event';
import {User} from './User';
import {CommentResponse} from '../service/types';

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

  @Column()
  content: string;

  @CreateDateColumn({comment: '생성 일시.'})
  createdAt: Date;

  toCommentResponse(userId?: number): CommentResponse {
    return {
      id: this.id,
      userId: this.user.id,
      eventId: this.event.id,
      content: this.content,
      createdAt: this.createdAt,
      wroteByMe: userId ? this.user.id == userId : undefined
    }
  }
}
