import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';
import {stringAsInt} from '../../libs/zodTypes';

const schema = defineSchema({
  params: {
    eventId: stringAsInt,
  },
});

export default defineRoute('delete', '/event/:eventId?', schema, async (req, res) => {
  const {eventId} = req.params;

  await EventService.deleteEvent(eventId);

  return res.send(`이벤트 ${eventId}를 삭제했습니다.`);
});
