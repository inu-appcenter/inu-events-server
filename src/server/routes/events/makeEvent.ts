import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';
import UserService from '../../../service/UserService';
import {stringAsDate} from '../../libs/zodTypes';
import {authorizer} from '../../middleware/authorizer';

const schema = defineSchema({
  body: {
    host: z.string(),
    category: z.string(),
    title: z.string(),
    body: z.string(),
    imageUuid: z.string().optional(),
    submissionUrl: z.string().optional(),
    startAt: stringAsDate.optional(),
    endAt: stringAsDate.optional(),
  }
});

export default defineRoute('post', '/events', schema, authorizer(), async (req, res) => {
  console.log('make Event!');

  const userId = req.requireUserId();

  const user = await UserService.getUser(userId)
  await EventService.makeEvent({user, ...req.body});

  res.sendStatus(201); //success
});


