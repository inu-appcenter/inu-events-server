import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';
import {EventResponseScheme} from '../../../entity/schemes';

const schema = defineSchema({
  summary: '내가 쓴 행사를 다 가져옵니다.',
  description: '행사 id 역순으로 가져옵니다.',

  response: [EventResponseScheme]
});

export default defineRoute('get', '/myevents', schema, async (req, res) => {
  const userId = req.requireUserId();
  const eventInformation = await EventService.getMyEvents(userId);
  return res.json(await Promise.all(eventInformation.map(e => e.toResponse(userId))))
});
