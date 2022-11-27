import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {authorizer} from '../../middleware/authorizer';
import NotificationService from '../../../service/NotificationService';
import {EventNotificationRequestScheme} from '../../../entity/schemes';

const schema = defineSchema({
  tags: ['Notification'],
  summary: '행사 오픈/마감 알림 등록하기',
  description: '행사의 오픈 또는 마감 알림을 등록합니다. 만약 해당 일시가 지난 상태에서 알림을 등록하면 1분(스케줄러 인터벌) 내에 알림이 발송될 것입니다.',

  body: EventNotificationRequestScheme
});

export default defineRoute('post', '/notifications', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();
  const {eventId, setFor} = req.body;

  await NotificationService.setNotification(userId, eventId, setFor);

  return res.send();
});
