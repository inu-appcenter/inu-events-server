import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';

const schema = defineSchema({
  params: {
    eventId: z.string(),
  },
});

export default defineRoute('get', '/event/:eventId?', schema, async (req, res) => {
  const {eventId} = req.params;

  const eventInformation = await EventService.getEvent(eventId);

  return res.json(eventInformation)
});
