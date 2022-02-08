import User from '../entity/User';
import Event from '../entity/Event';

type ModifyEventParams = {
  user: User;
  host: string;
  category: string;
  title: string;
  body: string;
  imageUuid: string;
  startAt: Date;
  endAt: Date
}

class EventService {
  async makeEvent({user, host, category, title, body, imageUuid, startAt, endAt}: ModifyEventParams): Promise<Event> {
    return await Event.create({
      user: user,
      host: host,
      category: category,
      title: title,
      body: body,
      imageUuid: imageUuid,
      startAt: startAt,
      endAt: endAt
    }).save();
  }

  async getEvent(eventId: number): Promise<Event> {
    return await Event.findOne({where: {id: eventId}});
  }

  async getEvents(): Promise<Event[]> {
    return await Event.find();
  }

  async patchEvent(eventId: number, body: Partial<ModifyEventParams>): Promise<string> {
    const patchevent = await Event.update(
      {id: eventId},
      body
    );
    return patchevent.raw;
  }

  async deleteEvent(eventId: number): Promise<string> {
    await Event.delete({id: eventId});
    return;
  }
}

export default new EventService();
