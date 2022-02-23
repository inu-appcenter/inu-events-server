import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {authorizer} from '../../middleware/authorizer';
import LikeService from '../../../service/LikeService';
import {EventResponseScheme} from '../../../entity/schemes';

const schema = defineSchema({
  summary: '행사 좋아요 가져오기',
  description: '좋아요 한 행사를 가져옵니다.',

  response: [EventResponseScheme]
});

export default defineRoute('get', '/likes', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();

  const likedEvents = await LikeService.getLikedEvents(userId);

  return res.json(await Promise.all(likedEvents.map(e => e.toEventResponse(userId))))
});
