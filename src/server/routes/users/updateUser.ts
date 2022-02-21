import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import UserService from '../../../service/UserService';
import {stringAsInt} from '../../libs/zodTypes';
import {authorizer} from '../../middleware/authorizer';

/**
 * @Deprecated 쓰지마세요 이거 이제 안써요!! 코드 손댄지도 오래됨 사용자 필드 못따라감!!
 * 사용자 업데이트 권한은 사용자 본인에게만 있어야 하기에 updateMe.ts <- 이거 새로 만들었어요!
 */

const schema = defineSchema({
  params: {
    id: stringAsInt,
  },
  body: {
    nickname: z.string().optional(),
  }
});

export default defineRoute('patch', '/users/:id', schema, authorizer(), async (req, res) => {
  const {id} = req.params;

  await UserService.patchUser(id, req.body);

  return res.send(`유저 ${id}의 정보를 ${JSON.stringify(req.query)}으로 변경하였습니다.`);
});
