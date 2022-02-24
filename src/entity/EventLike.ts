import {Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import User from './User';
import Event from './Event';
import BaseBetterEntity from '../common/base/BaseBetterEntity';

/**
 * 어느 행사에 달린 "좋아요"를 나타냅니다.
 */
@Entity()
export default class EventLike extends BaseBetterEntity {
  static relations = ['event', 'event.user', 'event.comments', 'event.likes', 'event.notifications'];

  @PrimaryGeneratedColumn({comment: '식별자.'})
  id: number

  /**
   * 좋아요를 남긴 사용자.
   * 사용자는 이 필드를 foreign key로 하여 자신이 가진 EventLike에 접근 가능.
   */
  @ManyToOne(() => User, (u) => u.likes)
  @JoinColumn()
  user: User

  /**
   * 사용자가 좋아요 한 행사.
   */
  @ManyToOne(() => Event, (e) => e.likes)
  @JoinColumn()
  event: Event
}
