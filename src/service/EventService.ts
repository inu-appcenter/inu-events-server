import Event from '../entity/Event';
import {log} from '../common/utils/log';
import {preview} from '../server/libs/json';
import User from '../entity/User';
import Comment from '../entity/Comment';
import EventLike from '../entity/EventLike';
import EventNotification from '../entity/EventNotification';
import UserService from './UserService';
import SubscriptionService from './SubscriptionService';
import {Infer} from '../common/utils/zod';
import {EventRequestScheme} from '../entity/schemes';

class EventService {
  async makeEvent(userId: number, body: Infer<typeof EventRequestScheme>): Promise<Event> {
    const user = await UserService.getUser(userId);

    const event = await Event.create({user, ...body}).save();

    log(`이벤트를 생성합니다: ${preview(body)}`);

    await SubscriptionService.broadcast(event);

    return event;
  }

  async getEvent(eventId: number): Promise<Event> {
    const event = await Event.findOneOrFail(eventId);

    event.hit();
    await event.save();

    return event;
  }

  async getMyEvents(userId: number): Promise<Event[]> {
    const user = await User.findOneOrFail(userId);
    if (user == null) {
      return [];
    }

    return await Event.find({where: {user}, order: {id: 'DESC'}});
  }

  async getEvents(): Promise<Event[]> {
    return await Event.find({order: {id: 'DESC'}});
  }

  async patchEvent(eventId: number, body: Partial<Infer<typeof EventRequestScheme>>): Promise<string> {
    log(`이벤트 ${eventId}를 업데이트합니다: ${preview(body)}`);

    const patchevent = await Event.update(
      {id: eventId},
      body
    );

    return patchevent.raw;
  }

  async deleteEvent(eventId: number): Promise<void> {
    const event = await Event.findOneOrFail(eventId);

    log(`${event}를 삭제하기에 앞서, 이벤트에 딸린 댓글을 모두 지웁니다.`);
    await Comment.delete({event});

    log(`${event}를 삭제하기에 앞서, 이벤트에 딸린 좋아요를 모두 지웁니다.`);
    await EventLike.delete({event});

    log(`${event}를 삭제하기에 앞서, 이벤트에 딸린 좋아요를 모두 지웁니다.`);
    await EventNotification.delete({event});

    log(`이제 ${event}를 삭제합니다.`);
    await Event.delete({id: eventId});
  }
}

export default new EventService();
