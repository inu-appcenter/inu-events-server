import User from '../entity/User';
import {Infer} from '../common/utils/zod';
import {SubscriptionSchema, TopicsScheme} from '../entity/schemes';

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
}

export default new SubscriptionService();

