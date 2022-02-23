import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import User from './User';
import Event from './Event';
import {z} from 'zod';
import {Infer} from '../common/utils/zod';

/**
 * 행사 오픈/마감 알림(이하 "알림")을 나타내는 엔티티입니다.
 * 이 알림은 사용자가 행사 오픈 또는 마감 알림을 등록할 때에 생성되며,
 * 지정된 매 interval 마다 아직 푸시알림이 보내지지 않은(=처리되지 않은)
 * 알림들은 푸시알림 전송 후 처리 완료로 기록될 것입니다.
 */
@Entity()
export default class EventNotification extends BaseEntity {
  @PrimaryGeneratedColumn({comment: '식별자.'})
  id: number

  /**
   * 알림을 등록한 사용자.
   * 사용자는 이 필드를 foreign key로 하여 자신이 가진 EventNotification에 접근 가능.
   */
  @ManyToOne(() => User, (u) => u.notifications)
  @JoinColumn()
  user: User;

  /**
   * 알림의 내용이 될 행사.
   */
  @ManyToOne(() => Event)
  @JoinColumn()
  event: Event;

  @Column({comment: '알림이 언제 도착해야 하나? 행사 시작 전? 마감 전? [start, end]'})
  setFor: string;

  @Column({comment: '이 알림이 전송되었는가?'})
  sent: boolean;

  markSent() {
    this.sent = true;
  }

  toResponse(): Infer<typeof EventNotificationScheme> {
    return {
      eventId: this.event.id,
      setFor: this.setFor
    }
  }
}

export const EventNotificationScheme = {
  eventId: z.number(),
  setFor: z.string(),
}
