import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';
import {EventResponseScheme} from '../../../entity/schemes';
import {stringAsInt} from "../../libs/zodTypes";
import {log} from "../../../common/utils/log";

const schema = defineSchema({
    summary: '행사를 페이지 별로 가져옵니다.',
    description: '- pageNum 페이지 부터, 한 번에 pageSize 개씩, id 역순으로 ! \n' +
        ' - pageNum은 0부터 시작입니다. \n' +
        '- query 하나라도 비어있으면 전체 결과를 출력합니다. (이전 버전 호환용) \n' +
        ' - pageSize= 0이면 전체 이벤트 내려줌',

    query: {
        pageNum: stringAsInt.optional(), //.optional() 로 줄까말까
        pageSize:stringAsInt.optional()
    },

    response: [EventResponseScheme]
});

export default defineRoute('get', '/events-by-page', schema, async (req, res) => {
    const {userId} = req;
    const {pageNum, pageSize} = req.query;
    let eventInformation;
    if(pageNum == undefined  || pageSize == undefined){ // 하나라도 비어있으면
        log(`pageNum: ${pageNum}, pageSize: ${pageSize} 하나라도 비어있으면 전체 결과 출력합니다!`);
        eventInformation = await EventService.getEvents(userId); // 전체 결과
    }else{
        eventInformation = await EventService.getEventsbyPage(userId, pageNum, pageSize); // 페이징 적용
    }

    return res.json(await Promise.all(eventInformation.map(e => e.toResponse(userId))));
});
