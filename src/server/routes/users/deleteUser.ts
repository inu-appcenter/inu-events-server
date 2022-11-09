import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import UserService from '../../../service/UserService';
import {stringAsInt} from '../../libs/zodTypes';
import {authorizer} from '../../middleware/authorizer';

const schema = defineSchema({
  summary: '사용자를 지웁니다.',
  description: '지울게 없어도 터지진 않아요.',

  params: {
    userId: stringAsInt,
  },
});

export default defineRoute('delete', '/users/:userId', schema, authorizer(), async (req, res) => {
  const {userId} = req.params;

  await UserService.deleteMyAllEvent(userId);

  return res.send();
});

