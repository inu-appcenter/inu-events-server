import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {authorizer} from '../../middleware/authorizer';
import SubscriptionService from '../../../service/SubscriptionService';
import {TopicsScheme} from '../../../entity/schemes';

const schema = defineSchema({
  summary: '새 행사 구독 토픽 설정하기',
  description: '새 글 알림에 대한 카테고리 필터를 설정합니다. 토픽 설정후에 [PUT]/subscription/subscribing 를 1로 만들어 주어야 알림이 켜집니다.',

  body: TopicsScheme
});

export default defineRoute('put', '/subscription/topics', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();
  const {topics} = req.body;

  await SubscriptionService.updateTopics(userId, topics);

  return res.send();
});
