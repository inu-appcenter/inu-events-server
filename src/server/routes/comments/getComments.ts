import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {stringAsInt} from '../../libs/zodTypes';
import CommentService from '../../../service/CommentService';

const schema = defineSchema({
  query: {
    eventId: stringAsInt,
  },
});

export default defineRoute('get', '/comments', schema, async (req, res) => {
  const {eventId} = req.query;
  const {userId} = req;

  const commentInformation = await CommentService.getComments(eventId);

  return res.json(commentInformation.map(c => c.toCommentResponse(userId)))
});
