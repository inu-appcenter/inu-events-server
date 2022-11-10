import {log} from '../common/utils/log';
import UserService from './UserService';
import {Infer} from '../common/utils/zod';
import {BlockUserRequestScheme} from '../entity/schemes';
import Block from '../entity/Block';
import {CantBlockYourSelf} from '../common/errors/general';

class BlockingService {
  async blockUser(userId: number, {targetUserId}: Infer<typeof BlockUserRequestScheme>): Promise<Block> {
    if (userId === targetUserId) {
      throw CantBlockYourSelf();
    }

    const blockingUser = await UserService.getUser(userId);
    const blockedUser = await UserService.getUser(targetUserId);

    const existingBlock = await Block.findOne({blockingUser, blockedUser});
    if (existingBlock != null) {
      log(`${blockingUser.toString()}는 이미 ${blockedUser.toString()}를 차단하였습니다.`);
      return existingBlock;
    }

    const block = await Block.create({blockingUser, blockedUser}).save();

    log(`${blockingUser.toString()}가 ${blockedUser.toString()}를 차단합니다.`);

    return block;
  }

  async unblockUser(userId: number, {targetUserId}: Infer<typeof BlockUserRequestScheme>): Promise<void> {
    if (userId === targetUserId) {
      throw CantBlockYourSelf();
    }

    const blockingUser = await UserService.getUser(userId);
    const blockedUser = await UserService.getUser(targetUserId);

    const existingBlock = await Block.findOne({blockingUser, blockedUser});
    if (existingBlock == null) {
      log(`${blockingUser.toString()}는 ${blockedUser.toString()}를 차단한 적이 없습니다.`);
      return;
    }

    await existingBlock.remove();

    log(`${blockingUser.toString()}가 ${blockedUser.toString()}를 차단 해제합니다.`);
  }

  async unBlockAllUser(userId: number): Promise<void> {
    const blockingUser = await UserService.getUser(userId);

    const existingBlock = await Block.findOne({blockingUser});
    if (existingBlock == null) {
      log(`${blockingUser.toString()}는 다른 사용자를 차단한 적이 없습니다.`);
      return;
    }

    await existingBlock.remove();

    log(`${blockingUser.toString()}가 모든 유저의 차단을 해제합니다.`);
  }


  async getBlocks(userId: number): Promise<Block[]> {
    const blockingUser = await UserService.getUser(userId);

    return await Block.find({blockingUser});
  }
}

export default new BlockingService();
