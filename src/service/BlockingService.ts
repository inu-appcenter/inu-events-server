import {log} from '../common/utils/log';
import UserService from './UserService';
import {Infer} from '../common/utils/zod';
import {BlockUserRequestScheme} from '../entity/schemes';
import Block from '../entity/Block';
import {CantBlockYourSelf} from '../common/errors/general';

class BlockingService {
  async blockUser(userId: number, {userIdToBlock}: Infer<typeof BlockUserRequestScheme>): Promise<Block> {
    if (userId === userIdToBlock) {
      throw CantBlockYourSelf();
    }

    const blockingUser = await UserService.getUser(userId);
    const blockedUser = await UserService.getUser(userIdToBlock);

    const existingBlock = await Block.findOne({blockingUser, blockedUser});
    if (existingBlock != null) {
      log(`${blockingUser.toString()}는 이미 ${blockedUser.toString()}를 차단하였습니다.`);
      return existingBlock;
    }

    const block = await Block.create({blockingUser, blockedUser}).save();

    log(`${blockingUser.toString()}가 ${blockedUser.toString()}를 차단합니다.`);

    return block;
  }
}

export default new BlockingService();
