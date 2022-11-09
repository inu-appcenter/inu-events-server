import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import UserService from '../../../service/UserService';
import {stringAsInt} from '../../libs/zodTypes';
import {authorizer} from '../../middleware/authorizer';

const schema = defineSchema({
  summary: '회원탈퇴 - 사용자를 DB에서 완전히 삭제합니다.',
  description: '본인만 삭제가능!!! 사용자와 관련된 글, 댓글, 좋아요, 등등을 모두 지웁니다. 되돌릴 수 없어요! 신중하게!!',

});

export default defineRoute('delete', '/delete-me', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();
  await UserService.deleteUserHardly(userId);

  return res.send();
});

