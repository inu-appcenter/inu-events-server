import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';
import {EventResponseScheme} from '../../../entity/schemes';
import {stringAsInt} from "../../libs/zodTypes";

const schema = defineSchema({
    tags: ['이제안씀'],
    summary: '[이제안씀] 현재 진행중인 행사만 가져옵니다. (new 페이징 적용)',
    description: '- 마감인 행사는 보여주지 않고, 진행 중인 행사만 내려줍니다. \n' +
        '- pageNum 페이지 부터, 한 번에 pageSize 개씩, id 역순으로 ! \n' +
        ' - pageNum은 0부터 시작입니다. \n' +
        '-  - query 하나라도 비어있으면 전체 결과를 출력합니다. (이전 버전 호환용)\n' +
        ' - pageSize= 0이면 전체 이벤트 내려줌',

    query: {
        pageNum: stringAsInt.optional(),
        pageSize:stringAsInt.optional()
    },

    response: [EventResponseScheme]
});

export default defineRoute('get', '/events-ongoing', schema, async (req, res) => {
    const {userId} = req;
    const {pageNum, pageSize} = req.query;

    const eventInformation = await EventService.getEventsOnGoing(userId, pageNum, pageSize);

    return res.json(await Promise.all(eventInformation.map(e => e.toResponse(userId))));
});
