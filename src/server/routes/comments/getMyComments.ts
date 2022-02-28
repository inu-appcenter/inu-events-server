import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import CommentService from '../../../service/CommentService';
import {CommentResponseScheme} from '../../../entity/schemes';
import {authorizer} from '../../middleware/authorizer';

const schema = defineSchema({
  summary: '내가 쓴 댓글을 다 가져옵니다.',
  description: '댓글 id 역순으로 가져옵니다.',

  response: [CommentResponseScheme]
});

export default defineRoute('get', '/mycomments', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();

  const commentInformation = await CommentService.getMyComments(userId);

  return res.json(await Promise.all(commentInformation.map(c => c.toResponse(userId))));
});
