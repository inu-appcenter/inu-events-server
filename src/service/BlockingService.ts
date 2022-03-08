import {log} from '../common/utils/log';
import {preview} from '../server/libs/json';
import UserService from './UserService';
import {Infer} from '../common/utils/zod';
import {BlockUserRequestScheme} from '../entity/schemes';
import Block from '../entity/Block';

class BlockingService {

  async makeBlock(userId: number, body: Infer<typeof BlockUserRequestScheme>): Promise<Block> {
    const blockingUser = await UserService.getUser(userId);

    const blockList = await Block.create({
      blockingUser: blockingUser,
      blockedUser: body.blockedUserId,
    }).save();

    log(`[사용자${blockingUser.id}]가 [사용자${preview(body.blockedUserId)}] 를 차단합니다.`);
    return blockList;
  }
}

export default new BlockingService();
