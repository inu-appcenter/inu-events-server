import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {authorizer} from '../../middleware/authorizer';
import SubscriptionService, {TopicsScheme} from '../../../service/SubscriptionService';

const schema = defineSchema({
  summary: '새 행사 구독 토픽 설정하기',
  description: 'ㅎㅎ.',

  body: TopicsScheme
});

export default defineRoute('put', '/subscription/topics', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();
  const {topics} = req.body;

  await SubscriptionService.updateTopics(userId, topics);

  return res.send();
});
