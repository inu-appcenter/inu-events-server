import { number } from 'zod';
import Event from '../../entity/Event';

class UpdateEvent {
  async patchEvent(eventId:string, req_query:Object): Promise<string> {
    const eventid = parseInt(eventId)
    const patchevent = await Event.update(
        {
            id : eventid
        },
            req_query
        );
    return patchevent.raw;
  }
}

export default new UpdateEvent();


