import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';
import {stringAsDate, stringAsInt} from '../../libs/zodTypes';
import {authorizer} from '../../middleware/authorizer';

const schema = defineSchema({
  params: {
    eventId: stringAsInt,
  },
  body: {
    host: z.string().optional(),
    category: z.string().optional(),
    title: z.string().optional(),
    body: z.string().optional(),
    imageUuid: z.string().optional(),
    startAt: stringAsDate.optional(),
    endAt: stringAsDate.optional(),
  }
});

export default defineRoute('patch', '/events/:eventId?', schema, authorizer(), async (req, res) => {
  const {eventId} = req.params;

  await EventService.patchEvent(eventId, req.body);

  return res.send(`event ${eventId}를 업데이트: ${JSON.stringify(req.query)}`);
});
