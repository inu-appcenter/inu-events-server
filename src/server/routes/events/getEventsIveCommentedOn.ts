import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {EventResponseScheme} from '../../../entity/schemes';
import EventService from '../../../service/EventService';

const schema = defineSchema({
  summary: '내가 쓴 댓글이 딸린 이벤트를 다 가져옵니다.',
  description: '이벤트 id 역순으로 가져옵니다.',

  response: [EventResponseScheme]
});

export default defineRoute('get', '/events-ive-commented', schema, async (req, res) => {
  const userId = req.requireUserId();

  const events = await EventService.getEventsIveCommentedOn(userId);

  return res.json(await Promise.all(events.map(c => c.toResponse(userId))));
});
