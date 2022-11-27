import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {authorizer} from '../../middleware/authorizer';
import SubscriptionService from '../../../service/SubscriptionService';
import {SubscriptionScheme} from '../../../entity/schemes';

const schema = defineSchema({
  tags: ['Subscription'],
  summary: '새 행사 구독 여부 가져오기',
  description: '새 글 알림이 켜져있는지 아니면 꺼져있는지 여부를 가져옵니다.',

  response: SubscriptionScheme
});

export default defineRoute('get', '/subscription/subscribing', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();

  const subscription = await SubscriptionService.getSubscription(userId);

  return res.json(subscription);
});
