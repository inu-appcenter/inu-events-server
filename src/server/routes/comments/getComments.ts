import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {stringAsInt} from '../../libs/zodTypes';
import CommentService from '../../../service/CommentService';
import {CommentResponseScheme} from '../../../entity/schemes';

const schema = defineSchema({
  summary: '댓글 다 가져오기.',
  description: '댓글을 싹 다 가져옵니다.',

  query: {
    eventId: stringAsInt,
  },

  response: [CommentResponseScheme]
});

export default defineRoute('get', '/comments', schema, async (req, res) => {
  const {eventId} = req.query;
  const {userId} = req;

  const commentInformation = await CommentService.getComments(eventId);

  return res.json(await Promise.all(commentInformation.map(c => c.toResponse(userId))));
});
