import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {authorizer} from '../../middleware/authorizer';
import NotificationService from '../../../service/NotificationService';
import {EventNotificationRequestScheme} from '../../../entity/schemes';

const schema = defineSchema({
  tags: ['Notification'],
  summary: '행사 오픈/마감 알림 취소하기',
  description: '행사의 오픈 또는 마감 알림을 취소합니다. 이미 보내진 알림에는 영향을 미치지 못합니다.',

  body: EventNotificationRequestScheme
});

export default defineRoute('delete', '/notifications', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();
  const {eventId, setFor} = req.body;

  await NotificationService.unsetNotification(userId, eventId, setFor);

  return res.send();
});
