import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import UserService from '../../../service/UserService';
import {stringAsInt} from '../../libs/zodTypes';
import {authorizer} from '../../middleware/authorizer';

const schema = defineSchema({
  params: {
    id: stringAsInt,
  },
});

export default defineRoute('delete', '/users/:id', schema, authorizer(), async (req, res) => {
  const {id} = req.params;

  await UserService.deleteUser(id);

  return res.send(`유저 ${id}를 삭제했습니다.`);
});
