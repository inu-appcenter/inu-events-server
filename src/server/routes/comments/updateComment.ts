import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import CommentService from '../../../service/CommentService';
import {stringAsInt} from '../../libs/zodTypes';
import {authorizer} from '../../middleware/authorizer';
import {CommentRequestScheme, partialSchemeOf} from '../../../entity/schemes';

const schema = defineSchema({
  tags: ['Comments'],
  summary: '댓글 하나를 업데이트합니다.',
  description: '업데이트 할 게 없어도 터지진 않아요.',

  params: {
    commentId: stringAsInt,
  },
  body: partialSchemeOf(CommentRequestScheme)
});

export default defineRoute('patch', '/comments/:commentId', schema, authorizer(), async (req, res) => {
  const {commentId} = req.params;

  await CommentService.patchComment(commentId, req.body);

  return res.send();
});
