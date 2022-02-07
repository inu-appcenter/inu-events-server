import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import CommentService from '../../../service/CommentService';
import {stringAsInt} from '../../libs/zodTypes';

const schema = defineSchema({
  params: {
    commentId: stringAsInt,
  },
  query: {
    content: z.string()
  }
});

export default defineRoute('patch', '/comment/:commentId?', schema, async (req, res) => {
  const {commentId} = req.params;

  await CommentService.patchComment(commentId, req.query);

  return res.send(`comment ${commentId}를 업데이트 : ${JSON.stringify(req.query)}`);
});
