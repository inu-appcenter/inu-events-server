import UserService from '../../../service/UserService';
import {stringAsInt} from '../../libs/zodTypes';
import {defineRoute} from '../../libs/route';
import {defineSchema} from '../../libs/schema';
import {UserResponseScheme} from '../../../entity/schemes';

const schema = defineSchema({
  summary: '사용자 가져오기',
  description: '사용자를 하나 가져옵니다.',

  params: {
    id: stringAsInt,
  },

  response: UserResponseScheme
});

export default defineRoute('get', '/users/:id', schema, async (req, res) => {
  const {id} = req.params;

  const user = await UserService.getUser(id);

  return res.json(await user.toResponse());
});

