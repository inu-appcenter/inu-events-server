import User from '../entity/User';
import Event from '../entity/Event';
import Comment from '../entity/Comment';

type ModifyCommentParams = {
  user: User;
  event: Event;
  content: string;
};

class CommentService {
  async makeComment({user, event, content}: ModifyCommentParams): Promise<Comment> {
    return await Comment.create({
      user: user,
      event: event,
      content: content
    }).save();
  }

  async getComment(commentId: number): Promise<Comment> {
    return await Comment.findOneOrFail(commentId, {relations: ['user']});
  }

  async getComments(eventId: number): Promise<Comment[]> {
    const event = await Event.findOneOrFail(eventId);

    return await Comment.find({where: {event}});
  }

  async patchComment(commentId: number, body: Partial<ModifyCommentParams>): Promise<string> {
    const patchevent = await Comment.update(
      {id: commentId},
      body
    );
    return patchevent.raw;
  }

  async deleteComment(commentId: number): Promise<void> {
    await Comment.delete({
      id: commentId
    });
  }
}

export default new CommentService();
