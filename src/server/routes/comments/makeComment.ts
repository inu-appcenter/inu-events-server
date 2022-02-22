import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import CommentService from '../../../service/CommentService';
import UserService from '../../../service/UserService';
import EventService from '../../../service/EventService';
import {authorizer} from '../../middleware/authorizer';

const schema = defineSchema({
  summary: '댓글을 씁니다.',
  description: '네.',

  body: {
    eventId: z.number(),
    content: z.string(),
  }
});

export default defineRoute('post', '/comments', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();
  const {eventId, content} = req.body;

  const user = await UserService.getUser(userId);
  const event = await EventService.getEvent(eventId);

  await CommentService.makeComment({user, event, content});

  res.send();
});
