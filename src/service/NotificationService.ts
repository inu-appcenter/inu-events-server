import User from '../entity/User';
import {NoSuchResource} from '../common/errors/general';
import assert from 'assert';
import EventNotification from '../entity/EventNotification';
import Event from '../entity/Event';
import {log} from '../common/utils/log';

class NotificationService {
  async setNotification(userId: number, eventId: number, setFor: string) {
    const user = await User.findOne(userId);
    const event = await Event.findOne(eventId);

    assert(user, NoSuchResource());
    assert(event, NoSuchResource());

    const existingNotification = await EventNotification.findOne({where: {user, event, setFor, sent: false}});

    if (existingNotification) {
      log(`${user.toString()}는 이미 ${event.toString()}의 ${setFor} 알림을 등록해 놓았습니다.`);
      return;
    }

    await EventNotification.create({user, event, setFor, sent: false}).save();

    log(`${user.toString()}는 이제 ${event.toString()}의 ${setFor}에 알림을 받습니다.`);
  }

  async unsetNotification(userId: number, eventId: number, setFor?: string) {
    const user = await User.findOne(userId);
    const event = await Event.findOne(eventId);

    assert(user, NoSuchResource());
    assert(event, NoSuchResource());

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

  async getNotification(userId: number, eventId: number) {
    const user = await User.findOne(userId);
    const event = await Event.findOne(eventId);

    assert(user, NoSuchResource());
    assert(event, NoSuchResource());

    return await EventNotification.findOne({where: {user, event}, relations: ['user', 'event', 'event.user', 'event.likes', 'event.notifications']});
  }

  async getNotifications(userId: number) {
    const user = await User.findOne(userId);

    assert(user, NoSuchResource());

    return await EventNotification.find({where: {user}, relations: ['user', 'event', 'event.user', 'event.likes', 'event.notifications']});
  }

  async getAllUnSentNotifications() {
    return await EventNotification.find({where: {sent: false}, relations: ['user', 'event', 'event.user', 'event.likes', 'event.notifications']});
  }
}

export default new NotificationService();
