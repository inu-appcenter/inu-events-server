import User from '../entity/User';
import {Infer} from '../common/utils/zod';
import FcmService from './FcmService';
import Event from '../entity/Event';
import {SubscriptionSchema, TopicsScheme} from '../entity/schemes';
import {log} from '../common/utils/log';

class SubscriptionService {
  async getSubscription(userId: number): Promise<Infer<typeof SubscriptionSchema>> {
    const user = await User.findOneOrFail(userId);

    return {
      subscribing: user.subscribing,
    }
  }

  async updateSubscription(userId: number, subscribe: boolean) {
    const user = await User.findOneOrFail(userId);

    user.setSubscription(subscribe);

    await user.save();
  }

  async getTopics(userId: number): Promise<Infer<typeof TopicsScheme>> {
    const user = await User.findOneOrFail(userId);

    return {
      topics: user.getTopics(),
    }
  }

  async updateTopics(userId: number, topics: string[]) {
    const user = await User.findOneOrFail(userId);

    user.setTopics(topics);

    await user.save();
  }

  /**
   * 이 행사의 등록에 대해 알림을 받아야 할 모오오든 사용자에게 알림을 뿌립니다.
   *
   * @param event 등록된 행사.
   */
  async broadcast(event: Event) {
    const allUsers = await User.find();
    const toBeNotified = allUsers.filter((u) => u.shallThisUserBeNotifiedWithThisEvent(event));

    log(`이 ${event.toString()}에 대해 전체 ${allUsers.length}명의 사용자 중 ${toBeNotified.length}명의 사용자에게 알림을 빵야!!`);

    await Promise.all(toBeNotified.map((u) =>
      FcmService.send(u, `${event.category}에 새 글이 올라왔어요`, '')
    ))
  }
}

export default new SubscriptionService();

