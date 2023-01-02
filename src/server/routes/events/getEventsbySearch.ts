import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';
import {EventResponseScheme} from '../../../entity/schemes';
import {stringAsInt} from "../../libs/zodTypes";
import {z} from 'zod';
import { string } from 'zod';

const schema = defineSchema({
    tags: ['Events'],
    summary: '검색한 행사를 가지고 옵니다.)',
    description: '- pageNum 페이지 부터, 한 번에 pageSize 개씩, id 역순으로 ! \n' +
        ' - pageNum은 0부터 시작입니다. \n' +
        '- query 하나라도 비어있으면 전체 결과를 출력합니다. (이전 버전 호환용) \n' +
        ' - pageSize= 0이면 전체 이벤트 내려줌',

    query: {
        content:z.string(),
        pageNum: stringAsInt.optional(),
        pageSize:stringAsInt.optional()
    },
    
    response: [EventResponseScheme]
});

export default defineRoute('get', '/events-by-search', schema, async (req, res) => {
    const {userId} = req;
    const {content,pageNum,pageSize} = req.query;
    const eventInformation = await EventService.getEventsbySearch(userId, content,pageNum, pageSize); // 페이징 적용

    return res.json(await Promise.all(eventInformation.map(e => e.toResponse(userId))));
});
