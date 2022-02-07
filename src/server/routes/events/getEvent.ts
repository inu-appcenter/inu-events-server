import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';
import {stringAsInt} from '../../libs/zodTypes';

const schema = defineSchema({
  params: {
    eventId: stringAsInt,
  },
});

export default defineRoute('get', '/event/:eventId?', schema, async (req, res) => {
  const {eventId} = req.params;

  const eventInformation = await EventService.getEvent(eventId);

  return res.json(eventInformation)
});
