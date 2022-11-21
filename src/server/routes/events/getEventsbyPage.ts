import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';

import {EventPageResponseScheme, EventResponseScheme} from '../../../entity/schemes';
import {stringAsInt} from "../../libs/zodTypes";
import {log} from "../../../common/utils/log";

const schema = defineSchema({
    summary: '행사를 페이지 별로 가져옵니다.',
    description: '한 번에 pageSize 개씩, id 역순으로 !',

    query: {
        pageNum: stringAsInt,
        pageSize:stringAsInt
    },

    response: [EventResponseScheme]
});

export default defineRoute('get', '/events-by-page', schema, async (req, res) => {
    const {userId} = req;
    const {pageNum, pageSize} = req.params;

    log(`Route: pageNum 값은 ${pageNum} 입니다./ pageSize는 ${pageSize} 입니다.`)
    const eventInformation = await EventService.getEventsbyPage(userId, pageNum, pageSize);

    return res.json(await Promise.all(eventInformation.map(e => e.toResponse(userId))));
});
