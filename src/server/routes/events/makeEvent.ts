import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';
import UserService from '../../../service/UserService';
import {stringAsDate} from '../../libs/zodTypes';

const schema = defineSchema({
  body: {
    host: z.string(),
    category: z.string(),
    title: z.string(),
    body: z.string(),
    imageUuid: z.string().optional(),
    startAt: stringAsDate.optional(),
    endAt: stringAsDate.optional(),
  }
});

export default defineRoute('post', '/events', schema, async (req, res) => {
  console.log('make Event!');

  const {userId} = req;
  const {host, category, title, body, imageUuid, startAt, endAt} = req.body;

  const user = await UserService.getUser(userId)
  await EventService.makeEvent({user, host, category, title, body, imageUuid, startAt, endAt});

  res.sendStatus(201); //success
});


