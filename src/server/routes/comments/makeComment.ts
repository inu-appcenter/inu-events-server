import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import CommentService from '../../../service/CommentService';
import {authorizer} from '../../middleware/authorizer';
import {CommentRequestScheme} from '../../../entity/schemes';

const schema = defineSchema({
  tags: ['Comments'],
  summary: '댓글을 씁니다.',
  description: '네.',

  body: CommentRequestScheme
});

export default defineRoute('post', '/comments', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();

  await CommentService.makeComment(userId, req.body);

  res.send();
});
