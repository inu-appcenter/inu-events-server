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

  async patchComment(commentId: string, req_query: Object): Promise<string> {
    const commentIdStr2Num = parseInt(commentId)
    const patchevent = await Comment.update(
      {id: commentIdStr2Num},
      req_query
    );
    return patchevent.raw;
  }

  async deleteComment(commentId: string): Promise<string> {
    const coomentIdStr2Num = parseInt(commentId)
    await Comment.delete({
      id: coomentIdStr2Num
    });
    return;
  }
}

export default new CommentService();
