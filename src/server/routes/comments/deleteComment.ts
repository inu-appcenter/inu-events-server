import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import CommentService from '../../../service/CommentService';
import {stringAsInt} from '../../libs/zodTypes';

const schema = defineSchema({
  params: {
    commentId: stringAsInt
  },
});

export default defineRoute('delete', '/comment/:commentId', schema, async (req, res) => {
  const {commentId} = req.params;

  await CommentService.deleteComment(commentId);

  return res.send(`comment ${commentId}를 삭제했습니다.`);
});
