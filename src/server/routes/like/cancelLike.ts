import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import {authorizer} from '../../middleware/authorizer';
import LikeService from '../../../service/LikeService';

const schema = defineSchema({
  summary: '행사 취소',
  description: '행사에 좋아요를 취소합니다.',

  body: {
    eventId: z.number()
  }
});

export default defineRoute('delete', '/likes', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();
  const {eventId} = req.body;

  await LikeService.cancelLike(userId, eventId);

  return res.send();
});
