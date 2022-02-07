import User from '../entity/User';
import Event from '../entity/Event';
import Comment from '../entity/Comment';

class CommentService {
  async makeComment(user: User, event: Event, content: string): Promise<Comment> {
    return await Comment.create({
      user: user,
      event: event,
      content: content
    }).save();
  }

  async getComment(commentId: number): Promise<Comment | undefined> {
    return await Comment.findOne(commentId);
  }

  async patchComment(commentId: number, req_query: Object): Promise<string> {
    const patchevent = await Comment.update(
      {id: commentId},
      req_query
    );
    return patchevent.raw;
  }

  async deleteComment(commentId: number): Promise<string> {
    await Comment.delete({
      id: commentId
    });
    return;
  }
}

export default new CommentService();
