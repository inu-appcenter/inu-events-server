import User from '../entity/User';
import Event from '../entity/Event';
import EventLike from '../entity/EventLike';
import {log} from '../common/utils/log';

class LikeService {
  async performLike(userId: number, eventId: number) {
    const theUser = await User.findOneOrFail(userId);
    const theEvent = await Event.findOneOrFail(eventId);

    const existingLike = await EventLike.findOne({user: theUser, event: theEvent});

    if (existingLike) {
      log(`${theUser.toString()}는 이미 ${theEvent.toString()}를 like 합니다.`);
      return;
    }

    await EventLike.create({user: theUser, event: theEvent}).save();

    log(`${theUser.toString()}가 ${theEvent.toString()}를 좋아하는 EventLike를 생성했습니다.`);
  }

  async cancelLike(userId: number, eventId: number) {
    const theUser = await User.findOneOrFail(userId);
    const theEvent = await Event.findOneOrFail(eventId);

    const existingLike = await EventLike.findOne({where: {user: theUser, event: theEvent}});
    if (existingLike == null) {
      log(`${theUser.toString()}는 ${theEvent.toString()}를 like한 적이 없습니다!!`);
      return;
    }

    await existingLike.remove();

    log(`${theUser.toString()}는 이제 ${theEvent.toString()}를 좋아하지 않습니다.`);
  }

  async getLike(userId: number, eventId: number) {
    const theUser = await User.findOneOrFail(userId);
    const theEvent = await Event.findOneOrFail(eventId);

    const existingLike = await EventLike.findOne({user: theUser, event: theEvent});

    return existingLike != null;
  }

  async getLikedEvents(userId: number) {
    const theUser = await User.findOneOrFail(userId);

    const allLikes = await EventLike.find({user: theUser});

    return allLikes.map((l) => l.event);
  }
}

export default new LikeService();
