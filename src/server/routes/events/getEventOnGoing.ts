import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';
import {EventPageResponseScheme, EventResponseScheme} from '../../../entity/schemes';
import {stringAsInt} from "../../libs/zodTypes";

const schema = defineSchema({
    summary: '현재 진행중인 행사만 가져옵니다. (new 페이징 적용)',
    description: '- 마감인 행사는 보여주지 않고, 진행 중인 행사만 내려줍니다. \n' +
        '- pageNum 페이지 부터, 한 번에 pageSize 개씩, id 역순으로 ! \n' +
        ' - pageNum은 0부터 시작입니다. \n' +
        '- maxPage는 올림한 값입니다. 하나라도 비어있으면 오류남.\n' +
        ' - pageSize= 0이면 전체 이벤트 내려줌',

    query: {
        pageNum: stringAsInt,
        pageSize:stringAsInt
    },

    response: [EventPageResponseScheme]
});

export default defineRoute('get', '/events-ongoing', schema, async (req, res) => {
    const {userId} = req;
    const {pageNum, pageSize} = req.query;

    const eventInformation = await EventService.getEventsOnGoing(userId, pageNum, pageSize);
    const totalEvent = await EventService.getTotalEvent();

    const eventPageInformation = {  maxPage: Math.ceil(totalEvent / pageSize) ,
        totalEvent: totalEvent,
        event: eventInformation,
    }

    return res.json(eventPageInformation);
});
