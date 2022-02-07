import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import UserService from '../../../service/UserService';
import {stringAsInt} from '../../libs/zodTypes';

const schema = defineSchema({
});

export default defineRoute('get', '/me', schema, async (req, res) => {
  const {userId} = req;

  const user = await UserService.getUser(userId);

  return res.json(user.toResponse());
});

