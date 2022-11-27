import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';
import {EventResponseScheme} from '../../../entity/schemes';
import {authorizer} from '../../middleware/authorizer';
import {stringAsInt} from "../../libs/zodTypes";

const schema = defineSchema({
  tags: ['Events'],
  summary: '내가 쓴 행사를 다 가져옵니다.',
  description: '- pageNum 페이지 부터, 한 번에 pageSize 개씩, id 역순으로 ! \n' +
      ' - pageNum은 0부터 시작입니다. \n' +
      '- query 하나라도 비어있으면 전체 결과를 출력합니다. (이전 버전 호환용) \n' +
      ' - pageSize= 0이면 전체 이벤트 내려줌',

  query: {
    pageNum: stringAsInt.optional(), // 기존 API 망가지지 않도록
    pageSize:stringAsInt.optional()
  },
  response: [EventResponseScheme]
});

export default defineRoute('get', '/myevents', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();
  const {pageNum, pageSize} = req.query;

  const eventInformation = await EventService.getMyEvents(userId, pageNum, pageSize);

  return res.json(await Promise.all(eventInformation.map(e => e.toResponse(userId))))
});
