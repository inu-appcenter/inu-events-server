import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {authorizer} from '../../middleware/authorizer';
import NotificationService from '../../../service/NotificationService';
import {EventNotificationScheme} from '../../../entity/schemes';

const schema = defineSchema({
  tags: ['Notification'],
  summary: '행사 오픈/마감 알림 가져오기',
  description: '모두 다져옵니다. 다만 이미 알림 전송이 진행된 내역에 대해서는 가져오지 않습니다.',

  response: [EventNotificationScheme]
});

export default defineRoute('get', '/notifications', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();

  const notifications = await NotificationService.getUnsentNotifications(userId);

  return res.json(await Promise.all(notifications.map(n => n.toResponse(userId))));
});
