import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';
import UserService from '../../../service/UserService';
import {stringAsDate} from '../../libs/zodTypes';
import {authorizer} from '../../middleware/authorizer';

const schema = defineSchema({
  summary: '행사를 생성합니다.',
  description: '네.',

  body: {
    title: z.string(),
    host: z.string(),
    category: z.string(),
    target: z.string(),
    startAt: stringAsDate,
    endAt: stringAsDate.optional(),
    contact: z.string().optional(),
    location: z.string().optional(),

    body: z.string(),
    imageUuid: z.string().optional(),
  }
});

export default defineRoute('post', '/events', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();

  const user = await UserService.getUser(userId)
  await EventService.makeEvent({user, ...req.body});

  res.send();
});


