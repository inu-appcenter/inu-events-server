import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';
import {EventResponseScheme} from '../../../entity/schemes';
import {stringAsInt} from "../../libs/zodTypes";

const schema = defineSchema({
    tags: ['히히'],
    summary: '행사를 페이지 별로 가져옵니다. (이제 얘를 기본으로 씁니다.)',
    description: '- pageNum 페이지 부터, 한 번에 pageSize 개씩, id 역순으로 ! \n' +
        ' - pageNum은 0부터 시작입니다. \n' +
        '- query 하나라도 비어있으면 전체 결과를 출력합니다. (이전 버전 호환용) \n' +
        ' - pageSize= 0이면 전체 이벤트 내려줌',

    query: {
        pageNum: stringAsInt.optional(),
        pageSize:stringAsInt.optional()
    },

    response: [EventResponseScheme]
});

export default defineRoute('get', '/events', schema, async (req, res) => {
    const {userId} = req;
    const {pageNum, pageSize} = req.query;

    const eventInformation = await EventService.getEventsbyPage(userId, pageNum, pageSize); // 페이징 적용

    return res.json(await Promise.all(eventInformation.map(e => e.toResponse(userId))));
});
