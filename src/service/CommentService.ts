import Event from '../entity/Event';
import Comment from '../entity/Comment';
import User from '../entity/User';
import {log} from '../common/utils/log';
import UserService from './UserService';
import EventService from './EventService';
import {Infer} from '../common/utils/zod';
import {CommentRequestScheme} from '../entity/schemes';
import FcmService from "./FcmService";

class CommentService {
  async makeComment(userId: number, {eventId, content}: Infer<typeof CommentRequestScheme>): Promise<Comment> {
    const user = await UserService.getUser(userId);
    const event = await EventService.getEvent(eventId);

    const createComment = await Comment.create({
      user: user,
      event: event,
      content: content
    }).save();

    if(event.user.id !== user.id) { // 글을 쓴 사람 != 댓글 단 사람 일때
      await FcmService.send(event.user, `${event.title}`, `${user.nickname} 님이 ${event.user.nickname} 님의 글에  댓글을 남겼습니다.`);
    }
    return createComment;
  }

  async getComment(commentId: number): Promise<Comment> {
    return await Comment.findOneOrFail(commentId);
  }

  async getComments(eventId: number): Promise<Comment[]> {
    const event = await Event.findOne(eventId);
    if (event == null) {
      return [];
    }

    return await Comment.find({where: {event}, order: {id: 'ASC'}});
  }

  async getMyComments(userId: number): Promise<Comment[]> {
    const user = await User.findOneOrFail(userId);

    return await Comment.find({where: {user}, order: {id: 'DESC'}});
  }

  async patchComment(commentId: number, body: Partial<Infer<typeof CommentRequestScheme>>): Promise<string> {
    const patchevent = await Comment.update(commentId, body);

    return patchevent.raw;
  }

  async deleteComment(commentId: number): Promise<void> {
    log(`댓글 ${commentId} 삭제!`);

    await Comment.delete({
      id: commentId
    });
  }
}

export default new CommentService();
