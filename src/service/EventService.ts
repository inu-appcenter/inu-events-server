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

  async getEvent(eventId: string): Promise<Event> {
    const eventIdStr2Num = parseInt(eventId)
    return await Event.findOne({where: {id: eventIdStr2Num}});
  }

  async patchEvent(eventId: string, req_query: Object): Promise<string> {
    const eventIdStr2Num = parseInt(eventId)
    const patchevent = await Event.update(
      {
        id: eventIdStr2Num
      },
      req_query
    );
    return patchevent.raw;
  }

  async deleteEvent(eventId: string): Promise<string> {
    const eventIdStr2Num = parseInt(eventId)
    await Event.delete({
      id: eventIdStr2Num
    });
    return;
  }
}

export default new EventService();
