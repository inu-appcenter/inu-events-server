import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import UserService from '../../../service/UserService';
import {stringAsInt} from '../../libs/zodTypes';

const schema = defineSchema({
  params: {
    id: stringAsInt,
  },
  query: {
    nickname: z.string(),
  }
});

export default defineRoute('patch', '/user/:id', schema, async (req, res) => {
  const {id} = req.params;

  await UserService.patchUser(id, req.query);

  return res.send(`유저 ${id}의 정보를 ${JSON.stringify(req.query)}으로 변경하였습니다.`);
});
