import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';
import {stringAsInt} from '../../libs/zodTypes';
import {authorizer} from '../../middleware/authorizer';

const schema = defineSchema({
  tags: ['Events'],
  summary: '행사 하나를 지웁니다.',
  description: '지울게 없어도 터지진 않아요.',

  params: {
    eventId: stringAsInt,
  },
});

export default defineRoute('delete', '/events/:eventId', schema, authorizer(), async (req, res) => {
  const {eventId} = req.params;

  await EventService.deleteEvent(eventId);

  return res.send();
});
