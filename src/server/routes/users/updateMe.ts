import {z} from 'zod';
import UserService from '../../../service/UserService';
import {authorizer} from '../../middleware/authorizer';
import {defineRoute} from '../../libs/route';
import {defineSchema} from '../../libs/schema';

const schema = defineSchema({
  summary: '내 정보 업데이트하기',
  description: '내 정보를 업데이트합니다.',

  body: {
    nickname: z.string().optional(),
    imageUuid: z.string().optional()
  },
});

export default defineRoute('patch', '/me', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();

  await UserService.patchUser(userId, req.body);

  return res.send();
});
