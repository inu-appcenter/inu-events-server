import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import UserService from '../../../service/UserService';
import {stringAsInt} from '../../libs/zodTypes';
import {authorizer} from '../../middleware/authorizer';

const schema = defineSchema({
});

export default defineRoute('get', '/me', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();

  const user = await UserService.getUser(userId);

  return res.json(user.toResponse());
});

