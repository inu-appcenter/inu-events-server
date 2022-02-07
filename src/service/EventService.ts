import User from '../entity/User';
import Event from '../entity/Event';

class EventService {
  async makeEvent(user: User, host: string, category: string, title: string, body: string, imageUuid: string, startAt: Date, endAt: Date): Promise<Event> {
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

  async patchEvent(eventId: number, req_query: Object): Promise<string> {
    const patchevent = await Event.update(
      {id: eventId},
      req_query
    );
    return patchevent.raw;
  }

  async deleteEvent(id: number): Promise<string> {
    await Event.delete({id});
    return;
  }
}

export default new EventService();
