import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import CommentService from '../../../service/CommentService';
import {stringAsInt} from '../../libs/zodTypes';
import {authorizer} from '../../middleware/authorizer';

const schema = defineSchema({
  summary: '댓글 삭제하기.',
  description: '없어도 뻗진 않아요.',

  params: {
    commentId: stringAsInt
  },
});

export default defineRoute('delete', '/comments/:commentId', schema, authorizer(), async (req, res) => {
  const {commentId} = req.params;

  await CommentService.deleteComment(commentId);

  return res.send();
});
