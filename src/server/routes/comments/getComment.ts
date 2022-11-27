import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {stringAsInt} from '../../libs/zodTypes';
import CommentService from '../../../service/CommentService';
import {CommentResponseScheme} from '../../../entity/schemes';

const schema = defineSchema({
  tags: ['Comments'],
  summary: '댓글 가져오기.',
  description: '댓글을 하나 가져옵니다.',

  params: {
    commentId: stringAsInt,
  },

  response: CommentResponseScheme
});

export default defineRoute('get', '/comments/:commentId', schema, async (req, res) => {
  const {commentId} = req.params;
  const {userId} = req;

  const commentInformation = await CommentService.getComment(commentId);

  return res.json(await commentInformation.toResponse(userId))
});
