import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';
import {stringAsInt} from '../../libs/zodTypes';
import {authorizer} from '../../middleware/authorizer';
import {EventRequestScheme, partialSchemeOf} from '../../../entity/schemes';

const schema = defineSchema({
  summary: '행사를 업데이트합니다.',
  description: '없어도 뻗진 않아요. 필요한 필드만 보내주세요.',

  params: {
    eventId: stringAsInt,
  },
  body: partialSchemeOf(EventRequestScheme),
});

export default defineRoute('patch', '/events/:eventId?', schema, authorizer(), async (req, res) => {
  const {eventId} = req.params;

  await EventService.patchEvent(eventId, req.body);

  return res.send();
});
