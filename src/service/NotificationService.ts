import User from '../entity/User';
import EventNotification from '../entity/EventNotification';
import Event from '../entity/Event';
import {log} from '../common/utils/log';

class NotificationService {
  async setNotification(userId: number, eventId: number, setFor: string) {
    const user = await User.findOneOrFail(userId);
    const event = await Event.findOneOrFail(eventId);

    const existingNotification = await EventNotification.findOne({where: {user, event, setFor, sent: false}});

    if (existingNotification) {
      log(`${user.toString()}는 이미 ${event.toString()}의 ${setFor} 알림을 등록해 놓았습니다.`);
      return;
    }

    await EventNotification.create({user, event, setFor, sent: false}).save();

    log(`${user.toString()}는 이제 ${event.toString()}의 ${setFor}에 알림을 받습니다.`);
  }

  async unsetNotification(userId: number, eventId: number, setFor?: string) {
    const user = await User.findOneOrFail(userId);
    const event = await Event.findOneOrFail(eventId);

    const existingNotification = await EventNotification.findOne({
      where: {
        user,
        event,
        ...(setFor && {setFor}),
        sent: false
      }
    });

    if (existingNotification == null) {
      log(`${user.toString()}는 ${event.toString()}의 ${setFor} 알림을 등록한 적이 없습니다.`);
      return;
    }

    await existingNotification.remove();
  }

  async getUnSentNotification(userId: number, eventId: number) {
    const user = await User.findOneOrFail(userId);
    const event = await Event.findOneOrFail(eventId);

    return await EventNotification.findOne({user, event, sent: false});
  }

  async getUnsentNotifications(userId: number) {
    const user = await User.findOneOrFail(userId);

    return await EventNotification.find({user, sent: false});
  }

  async getAllUnSentNotifications() {
    return await EventNotification.find({sent: false});
  }
}

export default new NotificationService();
