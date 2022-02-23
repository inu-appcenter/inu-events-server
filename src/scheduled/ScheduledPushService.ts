import NotificationService from '../service/NotificationService';
import {log} from '../common/utils/log';

import {subHours, subMinutes, differenceInMinutes} from 'date-fns';
import FcmService from '../service/FcmService';

class ScheduledPushService {
  /**
   * 1분짜리 틱!
   */
  async tick(tickIntervalMinutes: number) {
    log(`드르륵...탁!`);

    const allNotificationsToHandle = await NotificationService.getAllUnSentNotifications();

    log(`처리해야 할 일 ${allNotificationsToHandle.length}개!`);

    for (const notification of allNotificationsToHandle) {
      if (!['start', 'end'].includes(notification.setFor)) {
        log(`setFor가 start도 end도 아닌('${notification.sent}'임) EventNotification은 모지?? 보낸걸로 칩시다.`);
        notification.markSent();
        await notification.save();
        continue;
      }

      const deadlineInTheFuture =
        notification.setFor === 'start' ?
          subMinutes(notification.event.startAt, 5) :
          notification.event.endAt ? subHours(notification.event.endAt, 24) : undefined;

      if (deadlineInTheFuture == null) {
        log(`이 친구는 마감 데드라인을 찾을 수가 없네요... 보낸걸로 칩시다.`);
        notification.markSent();
        await notification.save();
        continue;
      }

      if (differenceInMinutes(deadlineInTheFuture, new Date()) > tickIntervalMinutes) {
        // 이 친구는 아직 데드라인 tickIntervalMinutes 분 넘게 남아있어서 알림을 보낼 때가 아닙니다.
        continue;
      }

      await FcmService.send(notification.user, '하하', '히히'/*TODO*/);

      log(`${notification.user.toString()}에게 ${notification.event.toString()}에 대해 ${notification.setFor} 알림을 쐈습니다!`);

      notification.markSent();
      await notification.save();
    }
  }
}

export default new ScheduledPushService();
