import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import UserService from '../../../service/UserService';
import {stringAsInt} from '../../libs/zodTypes';

const schema = defineSchema({
  params: {
    id: stringAsInt,
  },
  body: {
    nickname: z.string().optional(),
  }
});

export default defineRoute('patch', '/users/:id', schema, async (req, res) => {
  const {id} = req.params;

  await UserService.patchUser(id, req.body);

  return res.send(`유저 ${id}의 정보를 ${JSON.stringify(req.query)}으로 변경하였습니다.`);
});
