import User from '../entity/User';
import Event from '../entity/Event';

type ModifyEventParams = {
  user: User;
  host: string;
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

    if (user.shallThisUserBeNotifiedWithThisEvent(event)) {
      // TODO 알림서비스 호출
    }

    return event;
  }

  async getEvent(eventId: number): Promise<Event> {
    return await Event.findOneOrFail(eventId, {relations: ['user']})
  }

  async getEvents(): Promise<Event[]> {
    return await Event.find({relations: ['user']});
  }

  async patchEvent(eventId: number, body: Partial<ModifyEventParams>): Promise<string> {
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
