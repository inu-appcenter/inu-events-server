import { number } from 'zod';
import Comment from '../../entity/Comment';

class UpdateComment {
  async patchComment(commentId:string, req_query:Object): Promise<string> {
    const commentIdStr2Num = parseInt(commentId)
    const patchevent = await Comment.update(
        {
            id : commentIdStr2Num
        },
            req_query
        );
    return patchevent.raw;
  }
}

export default new UpdateComment();
