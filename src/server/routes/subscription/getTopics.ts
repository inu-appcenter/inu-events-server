import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {authorizer} from '../../middleware/authorizer';
import SubscriptionService, {TopicsScheme} from '../../../service/SubscriptionService';

const schema = defineSchema({
  summary: '새 행사 구독 토픽 가져오기',
  description: 'ㅎㅎ.',

  response: TopicsScheme
});

export default defineRoute('get', '/subscription/topics', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();

  const topics = await SubscriptionService.getTopics(userId);

  return res.json(topics);
});
