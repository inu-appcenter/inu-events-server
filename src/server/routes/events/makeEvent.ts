import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';
import {authorizer} from '../../middleware/authorizer';
import {EventRequestScheme} from '../../../entity/schemes';

const schema = defineSchema({
  tags: ['Events'],
  summary: '행사를 생성합니다.',
  description: '네.',

  body: EventRequestScheme
});

export default defineRoute('post', '/events', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();

  await EventService.makeEvent(userId, req.body);

  res.send();
});


