import {log} from '../common/utils/log';
import UserService from './UserService';
import {Infer} from '../common/utils/zod';
import {BlockUserRequestScheme} from '../entity/schemes';
import Block from '../entity/Block';
import {CantBlockYourSelf} from '../common/errors/general';

class BlockingService {
  async makeBlock(userId: number, {blockedUserId}: Infer<typeof BlockUserRequestScheme>): Promise<Block> {
    if (userId === blockedUserId) {
      throw CantBlockYourSelf();
    }

    const blockingUser = await UserService.getUser(userId);
    const blockedUser = await UserService.getUser(blockedUserId);

    const block = await Block.create({blockingUser, blockedUser}).save();

    log(`${blockingUser.toString()}가 ${blockedUser} 를 차단합니다.`);

    return block;
  }
}

export default new BlockingService();
