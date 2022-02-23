import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {authorizer} from '../../middleware/authorizer';
import SubscriptionService, {SubscriptionSchema} from '../../../service/SubscriptionService';

const schema = defineSchema({
  summary: '새 행사 구독 여부 가져오기',
  description: 'ㅎㅎ.',

  response: SubscriptionSchema
});

export default defineRoute('get', '/subscription/subscribing', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();

  const subscription = await SubscriptionService.getSubscription(userId);

  return res.json(subscription);
});
