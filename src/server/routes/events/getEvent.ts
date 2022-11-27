import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';
import {stringAsInt} from '../../libs/zodTypes';
import {EventResponseScheme} from '../../../entity/schemes';

const schema = defineSchema({
  tags: ['Events'],
  summary: '행사 하나를 가져옵니다.',
  description: '없으면 터져요.',

  params: {
    eventId: stringAsInt,
  },

  response: EventResponseScheme,
});

export default defineRoute('get', '/events/:eventId', schema, async (req, res) => {
  const {eventId} = req.params;
  const {userId} = req;

  const eventInformation = await EventService.getEvent(eventId);

  return res.json(await eventInformation.toResponse(userId));
});
