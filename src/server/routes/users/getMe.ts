import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import UserService from '../../../service/UserService';
import {authorizer} from '../../middleware/authorizer';
import {UserResponseScheme} from '../../../entity/schemes';

const schema = defineSchema({
  summary: '내 정보 가져오기',
  description: '내 정보를 가져옵니다.',

  response: UserResponseScheme
});

export default defineRoute('get', '/me', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();

  const user = await UserService.getUser(userId);

  return res.json(user.toResponse());
});

