import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import UserService from '../../../service/UserService';

const schema = defineSchema({
  params: {
    id: z.string(),
  },
});

export default defineRoute('delete', '/user/:id', schema, async (req, res) => {
  const {id} = req.params;

  await UserService.deleteUser(id);

  return res.send(`유저 ${id}를 삭제했습니다.`);
});
