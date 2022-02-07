import { number } from 'zod';
import Event from '../../entity/Event';

class UpdateEvent {
  async patchEvent(eventId:string, req_query:Object): Promise<string> {
    const eventIdStr2Num = parseInt(eventId)
    const patchevent = await Event.update(
        {
            id : eventIdStr2Num
        },
            req_query
        );
    return patchevent.raw;
  }
}

export default new UpdateEvent();


