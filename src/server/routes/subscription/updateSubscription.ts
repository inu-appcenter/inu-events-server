import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {authorizer} from '../../middleware/authorizer';
import SubscriptionService from '../../../service/SubscriptionService';
import {SubscriptionSchema} from '../../../entity/schemes';

const schema = defineSchema({
  summary: '새 행사 구독 여부 설정하기',
  description: 'ㅎㅎ.',

  body: SubscriptionSchema
});

export default defineRoute('put', '/subscription/subscribing', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();
  const {subscribing} = req.body;

  await SubscriptionService.updateSubscription(userId, subscribing);

  return res.send();
});
