import Event from '../entity/Event';
import {log} from '../common/utils/log';
import {preview} from '../server/libs/json';
import User from '../entity/User';
import Comment from '../entity/Comment';
import EventLike from '../entity/EventLike';
import EventNotification from '../entity/EventNotification';
import UserService from './UserService';
import SubscriptionService from './SubscriptionService';
import {Infer} from '../common/utils/zod';
import {BlockUserRequestScheme, EventRequestScheme} from '../entity/schemes';
import BlockedList from "../entity/BlockedList";

class BlockingService {

  async makeBlock(userId: number, body: Infer<typeof BlockUserRequestScheme>): Promise<BlockedList> {
    const blockingUser = await UserService.getUser(userId);

    const blockList = await BlockedList.create({
      blockingUser: blockingUser,
      blockedUser: body.blockedUserId,
    }).save();

    log(`[사용자${blockingUser.id}]가 [사용자${preview(body.blockedUserId)}] 를 차단합니다.`);
    return blockList;
  }



}

export default new BlockingService();
