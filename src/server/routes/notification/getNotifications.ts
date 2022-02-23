import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {authorizer} from '../../middleware/authorizer';
import NotificationService from '../../../service/NotificationService';
import {EventNotificationScheme} from '../../../entity/schemes';

const schema = defineSchema({
  summary: '행사 오픈/마감 알림 가져오기',
  description: 'ㅎㅎ.',

  response: [EventNotificationScheme]
});

export default defineRoute('get', '/notifications', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();

  const notifications = await NotificationService.getNotifications(userId);

  return res.json(await Promise.all(notifications.map(n => n.toResponse(userId))));
});
