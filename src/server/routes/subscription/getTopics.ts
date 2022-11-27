import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {authorizer} from '../../middleware/authorizer';
import SubscriptionService from '../../../service/SubscriptionService';
import {TopicsScheme} from '../../../entity/schemes';

const schema = defineSchema({
  tags: ['Subscription'],
  summary: '새 행사 구독 토픽 가져오기',
  description: '새 글 알림에 대한 카테고리 필터를 가져옵니다.',

  response: TopicsScheme
});

export default defineRoute('get', '/subscription/topics', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();

  const topics = await SubscriptionService.getTopics(userId);

  return res.json(topics);
});
