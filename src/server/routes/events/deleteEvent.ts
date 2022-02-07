import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';
import {stringAsInt} from '../../libs/zodTypes';
import {authorizer} from '../../middleware/authorizer';

const schema = defineSchema({
  params: {
    eventId: stringAsInt,
  },
});

export default defineRoute('delete', '/events/:eventId', schema, authorizer(), async (req, res) => {
  const {eventId} = req.params;

  await EventService.deleteEvent(eventId);

  return res.send(`이벤트 ${eventId}를 삭제했습니다.`);
});
