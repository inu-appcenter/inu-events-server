import Event from '../../entity/Event';
import User from '../../entity/User';


class MakeEvent {
  async makeEvent(user: User,host: string, category: string, title: string, body: string, imageUuid: string, startAt: Date, endAt: Date): Promise<Event> {
      const newEvent = await Event.create({
        user: user,
        host: host,
        category: category,
        title: title,
        body: body,
        imageUuid: imageUuid,
        startAt: startAt,
        endAt: endAt
      }).save();

     return newEvent;
    }
    
}

export default new MakeEvent();
