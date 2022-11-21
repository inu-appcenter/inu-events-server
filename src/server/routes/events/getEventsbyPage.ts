import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';
import {EventPageResponseScheme} from '../../../entity/schemes';
import {stringAsInt} from "../../libs/zodTypes";

const schema = defineSchema({
    summary: '행사를 페이지 별로 가져옵니다.',
    description: 'pageNum 페이지 부터, 한 번에 pageSize 개씩, id 역순으로 !',

    query: {
        pageNum: stringAsInt,
        pageSize:stringAsInt
    },

    response: [EventPageResponseScheme]
});

export default defineRoute('get', '/events-by-page', schema, async (req, res) => {
    const {userId} = req;
    const {pageNum, pageSize} = req.query;

    const eventInformation = await EventService.getEventsbyPage(userId, pageNum, pageSize);
    const totalEvent = await EventService.getTotalEvent();

    const eventPageInformation = {  maxPage: totalEvent / pageSize ,
        totalEvent: totalEvent,
        event: eventInformation,
    }

    return res.json(eventPageInformation);
});
