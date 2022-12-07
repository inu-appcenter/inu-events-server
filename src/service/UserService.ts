import User from '../entity/User';
import {Infer} from '../common/utils/zod';
import {UpdateMeRequestScheme} from '../entity/schemes';
import { log } from '../common/utils/log';
import Event from '../entity/Event';
import EventLike from '../entity/EventLike';
import EventNotification from '../entity/EventNotification';
import EventService from './EventService';
import Block from '../entity/Block';
import BlockingService from "./BlockingService";
import CommentService from "./CommentService";

class UserService {
  async getUser(id: number): Promise<User> {
    return await User.findOneOrFail({where: {id}});
  }

  async getAllUsers(): Promise<User[]> {
    return await User.find({order: {id: 'DESC'}});
  }

  async patchUser(id: number, body: Partial<Infer<typeof UpdateMeRequestScheme>>): Promise<string> {
    const patchuser = await User.update(
      {id},
      body
    );
    return patchuser.raw;
  }

  async deleteUser(id: number): Promise<void> {
    const deleteDate = new Date();
    const deleteUser = await User.update(
      {id},
      {deletedAt: deleteDate}
    )
    return deleteUser.raw;
  }

  async deleteUserHardly(userId:number): Promise<void> {
    const user = await User.findOneOrFail(userId);
    const event = await Event.find({where:{user}});

    log(`${user.toString()}의 모든 like 정보를 삭제합니다.`);
    await EventLike.delete({user});

    log(`회원 탈퇴하기에 앞서, ${user.toString()}가 작성한 댓글 모두 삭제!`);
    await CommentService.deleteMyAllComment(userId)

    log(`회원 탈퇴하기에 앞서, ${user.toString()}가 설정한 알림 모두 삭제!`);
    await EventNotification.delete({user});

    log(`${user.toString()}가  작성한 이벤트 모두 삭제!`);
    await event.forEach(event => {
      EventService.deleteEvent(event.id);
    })

    log(`${user.toString()}가 설정한 차단 모두 삭제!`);
    await Block.delete({
      blockingUser: userId
    });

    await User.delete({
      id: userId
    });
    log(`${user.toString()} 탈퇴 성공!`);
  }
}

export default new UserService();
