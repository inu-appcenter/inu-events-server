import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';
import {EventResponseScheme} from '../../../entity/schemes';
import {stringAsInt} from "../../libs/zodTypes";
import {z} from 'zod';
import { string } from 'zod';

const schema = defineSchema({
    tags: ['Events'],
    summary: '키워드(content)로 이벤트를 검색합니다.',
    description: '- 공백으로 구분된 키워드를 기준으로 나눠서 검색합니다.\n' +
        '- 키워드(content) 중 적어도 하나가 포함된 이벤트를 전부 다 내려줍니다.(OR)\n' +
        '- 이벤트의 제목(title) 과 상세내용(body)에서 검색합니다.\n' +
        '- pageNum 페이지 부터, 한 번에 pageSize 개씩, id 역순으로 ! \n' +
        '-  content는 빈 값으로 주면 400에러 납니다! 사용자에게 다시 입력하라고 알려주세여!\n' +
        ' - pageNum은 0부터 시작입니다. \n' +
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
