import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {authorizer} from '../../middleware/authorizer';
import SubscriptionService from '../../../service/SubscriptionService';
import {SubscriptionScheme} from '../../../entity/schemes';

const schema = defineSchema({
  tags: ['Subscription'],
  summary: '새 행사 구독 여부 설정하기',
  description: '새 글 알림 켜짐/꺼짐 여부를 설정합니다.',

  body: SubscriptionScheme
});

export default defineRoute('put', '/subscription/subscribing', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();
  const {subscribing} = req.body;

  await SubscriptionService.updateSubscription(userId, subscribing);

  return res.send();
});
