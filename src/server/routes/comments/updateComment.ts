import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import CommentService from '../../../service/CommentService';
import {stringAsInt} from '../../libs/zodTypes';
import {authorizer} from '../../middleware/authorizer';

const schema = defineSchema({
  params: {
    commentId: stringAsInt,
  },
  body: {
    content: z.string()
  }
});

export default defineRoute('patch', '/comments/:commentId', schema, authorizer(), async (req, res) => {
  const {commentId} = req.params;

  await CommentService.patchComment(commentId, req.body);

  return res.send(`comment ${commentId}를 업데이트 : ${JSON.stringify(req.query)}`);
});
