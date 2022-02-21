import {z} from 'zod';
import UserService from '../../../service/UserService';
import {authorizer} from '../../middleware/authorizer';
import {defineRoute} from '../../libs/route';
import {defineSchema} from '../../libs/schema';

const schema = defineSchema({
  body: {
    nickname: z.string().optional(),
    imageUuid: z.string().optional()
  }
});

export default defineRoute('patch', '/me', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();

  await UserService.patchUser(userId, req.body);

  return res.send(`유저 ${userId}의 정보를 ${JSON.stringify(req.query)}으로 변경하였습니다.`);
});
