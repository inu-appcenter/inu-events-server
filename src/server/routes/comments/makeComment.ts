import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import ReturnUserInformation from '../../../service/ReturnUserInformation';
import ReturnEventInformation from '../../../service/ReturnEventInformation';
import CommentService from '../../../service/CommentService';

const schema = defineSchema({
  body: {
    //일단 accessToken으로 받아옴
    user: z.string(),
    //일단 event id로 받아옴.
    event: z.string(),
    content: z.string(),
  }
});

export default defineRoute('post', '/comment', schema, async (req, res) => {
  console.log('make coomet!');

  const {user, event, content} = req.body;

  const Userstatus = await ReturnUserInformation.findUserByAccessToken(user);
  const Eventstatus = await ReturnEventInformation.returnEvent(event);
  await CommentService.makeComment(Userstatus, Eventstatus, content);

  res.sendStatus(201); //success
});
