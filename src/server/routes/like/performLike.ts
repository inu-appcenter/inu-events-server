import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {authorizer} from '../../middleware/authorizer';
import {z} from 'zod';
import LikeService from '../../../service/LikeService';

const schema = defineSchema({
  summary: '행사 좋아요(저장하기)',
  description: '행사에 좋아요(저장) 표시를 합니다. (북마크 클릭 시)',

  body: {
    eventId: z.number()
  }
});

export default defineRoute('post', '/likes', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();
  const {eventId} = req.body;

  await LikeService.performLike(userId, eventId);

  return res.send();
});
