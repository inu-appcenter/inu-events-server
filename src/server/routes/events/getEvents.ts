import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';
import {EventResponseScheme} from '../../../entity/schemes';

const schema = defineSchema({
  summary: '행사를 다 가져옵니다.',
  description: '싹다!, 이벤트 id 역순으로!',

  response: [EventResponseScheme]
});

export default defineRoute('get', '/events', schema, async (req, res) => {
  const {userId} = req;

  const eventInformation = await EventService.getEvents(userId);

  return res.json(await Promise.all(eventInformation.map(e => e.toResponse(userId))));
});
