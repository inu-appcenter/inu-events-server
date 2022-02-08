import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {stringAsInt} from '../../libs/zodTypes';
import CommentService from '../../../service/CommentService';

const schema = defineSchema({
  params: {
    commentId: stringAsInt,
  },
});

export default defineRoute('get', '/comments/:commentId', schema, async (req, res) => {
  const {commentId} = req.params;
  const {userId} = req;

  const commentInformation = await CommentService.getComment(commentId);

  return res.json(commentInformation.toCommentResponse(userId))
});
