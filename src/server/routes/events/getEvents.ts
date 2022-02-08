import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';

const schema = defineSchema({});

export default defineRoute('get', '/events', schema, async (req, res) => {
  const eventInformation = await EventService.getEvents();

  return res.json(eventInformation)
});
