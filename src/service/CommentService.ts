import Event from '../entity/Event';
import Comment from '../entity/Comment';
import {log} from '../common/utils/log';
import UserService from './UserService';
import EventService from './EventService';
import {Infer} from '../common/utils/zod';
import {CommentRequestScheme} from '../entity/schemes';

class CommentService {
  async makeComment(userId: number, {eventId, content}: Infer<typeof CommentRequestScheme>): Promise<Comment> {
    const user = await UserService.getUser(userId);
    const event = await EventService.getEvent(eventId);

    return await Comment.create({
      user: user,
      event: event,
      content: content
    }).save();
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
