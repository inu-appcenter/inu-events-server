import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {authorizer} from '../../middleware/authorizer';
import NotificationService from '../../../service/NotificationService';
import {EventNotificationRequestScheme} from '../../../entity/schemes';

const schema = defineSchema({
  summary: '행사 오픈/마감 알림 등록하기',
  description: 'ㅎㅎ.',

  body: EventNotificationRequestScheme
});

export default defineRoute('post', '/notifications', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();
  const {eventId, setFor} = req.body;

  await NotificationService.setNotification(userId, eventId, setFor);

  return res.send();
});