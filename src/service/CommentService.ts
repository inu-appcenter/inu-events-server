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

  async getComments(eventId: number, userId?: number): Promise<Comment[]> {
    const event = await Event.findOne(eventId);
    if (event == null) {
      return [];
    }

    if (userId == null) {
      return await this.getCommentsRegardlessBlockings(event);
    } else {
      return await this.getCommentsWithoutBlockedUser(event, userId);
    }
  }

  private async getCommentsRegardlessBlockings(event: Event): Promise<Comment[]> {
    return await Comment.find({where: {event}, order: {id: 'ASC'}});
  }

  private async getCommentsWithoutBlockedUser(event: Event, requestorId: number): Promise<Comment[]> {
    return await Comment.createQueryBuilder('comment')
      /** relations 필드 가져오는 부분 */
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('comment.event', 'event')

      /** where 절을 위한 join(select는 안 함) */
      .leftJoin('comment.user', 'comment_composer')
      .where('event.id = :eventId', {eventId: event.id})
      .andWhere(`comment_composer.id NOT IN (
        SELECT blocked_user_id 
        FROM block
        WHERE block.blocking_user_id = :requestorId
      )`, {requestorId})

      .getMany(); // group by 안해도 얘가 잘 처리해줌 ^~^
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

  async deleteMyAllComment(userId: number): Promise<void> {
    const user = await User.findOneOrFail(userId);
    log(`${userId}가 작성한 댓글 모두 삭제 삭제!`);
    await Comment.delete({
      user: user
    });
  }
}

export default new CommentService();
