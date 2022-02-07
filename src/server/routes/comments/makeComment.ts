import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import CommentService from '../../../service/CommentService';
import UserService from '../../../service/UserService';
import EventService from '../../../service/EventService';
import {stringAsInt} from '../../libs/zodTypes';

const schema = defineSchema({
  body: {
    eventId: stringAsInt,
    content: z.string(),
  }
});

export default defineRoute('post', '/comments', schema, async (req, res) => {
  console.log('make coomet!');

  const {userId} = req;
  const {eventId, content} = req.body;

  const user = await UserService.getUser(userId);
  const event = await EventService.getEvent(eventId);

  await CommentService.makeComment({user, event, content});

  res.sendStatus(201); //success
});
