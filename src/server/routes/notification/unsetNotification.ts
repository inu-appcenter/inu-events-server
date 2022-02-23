import {defineSchema} from '../../libs/schema';
import {EventNotificationRequestScheme, EventNotificationScheme} from '../../../entity/EventNotification';
import {defineRoute} from '../../libs/route';
import {authorizer} from '../../middleware/authorizer';
import NotificationService from '../../../service/NotificationService';

const schema = defineSchema({
  summary: '행사 오픈/마감 알림 취소하기',
  description: 'ㅎㅎ.',

  body: EventNotificationRequestScheme
});

export default defineRoute('delete', '/notifications', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();
  const {eventId, setFor} = req.body;

  await NotificationService.unsetNotification(userId, eventId, setFor);

  return res.send();
});
