import { number } from 'zod';
import Event from '../../entity/Event';

class UpdateEvent {
  async patchEvent(eventId:number, req_query:Object): Promise<string> {
    const patchevent = await Event.update(
        {
            id : eventId
        },
            req_query
        );
    return patchevent.raw;
  }
}

export default new UpdateEvent();


