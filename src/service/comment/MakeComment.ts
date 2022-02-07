import Comment from '../../entity/Comment'
import Event from '../../entity/Event';
import User from '../../entity/User';



class MakeComment {
  async makeComment(user: User,event:Event, content: string): Promise<Comment> {
      const newComment = await Comment.create({
        user: user,
        event: event,
        content: content
      }).save();

     return newComment;
    }
    
}

export default new MakeComment();

