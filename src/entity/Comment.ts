import {BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import Event from './Event';
import {User} from './User';

@Entity()
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn({comment: '식별자.'})
  id: number;

  @ManyToOne(() => User, (u) => u.comments)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Event, (e) => e.comments)
  @JoinColumn()
  event: Event;

  @Column()
  content: string;

  @CreateDateColumn({comment: '생성 일시.'})
  createdAt: Date;
}
