import User from '../entity/User';
import Event from '../entity/Event';
import FcmService from './FcmService';
import {log} from '../common/utils/log';
import {preview} from '../server/libs/json';

type ModifyEventParams = {
  user: User;
  host?: string;
  category: string;
  title: string;
  body: string;
  imageUuid?: string;
  submissionUrl?: string;
  startAt?: Date;
  endAt?: Date
}

class EventService {
  async makeEvent(body: ModifyEventParams): Promise<Event> {
    const {user} = body;
    const event = await Event.create(body).save();

    log(`이벤트를 생성합니다: ${preview(body)}`);

    if (user.shallThisUserBeNotifiedWithThisEvent(event)) {
      await FcmService.send(user, `${event.category}에 새 글이 올라왔어요`, '');
    }

    return event;
  }

  async getEvent(eventId: number): Promise<Event> {
    const event = await Event.findOneOrFail(eventId);

    event.hit();
    await event.save();

    return event;
  }

  async getEvents(): Promise<Event[]> {
    return await Event.find();
  }

  async patchEvent(eventId: number, body: Partial<ModifyEventParams>): Promise<string> {
    log(`이벤트 ${eventId}를 업데이트합니다: ${preview(body)}`);

    const patchevent = await Event.update(
      {id: eventId},
      body
    );

    return patchevent.raw;
  }

  async deleteEvent(eventId: number): Promise<void> {
    await Event.delete({id: eventId});
  }
}

export default new EventService();
