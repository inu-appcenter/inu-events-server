import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import UserService from '../../../service/UserService';
import {stringAsInt} from '../../libs/zodTypes';

const schema = defineSchema({
  params: {
    id: stringAsInt,
  },
});

export default defineRoute('delete', '/users/:id', schema, async (req, res) => {
  const {id} = req.params;

  await UserService.deleteUser(id);

  return res.send(`유저 ${id}를 삭제했습니다.`);
});
