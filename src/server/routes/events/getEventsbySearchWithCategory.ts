import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';
import {EventResponseScheme} from '../../../entity/schemes';
import {stringAsInt,stringAsBoolean} from "../../libs/zodTypes";
import {z} from 'zod';
import { string } from 'zod';

const schema = defineSchema({
    tags: ['Events'],
    summary: '키워드(content)로 이벤트를 검색합니다.',
    description: '- 공백으로 구분된 키워드를 기준으로 나눠서 검색합니다.\n' +
        '- 키워드(content) 중 적어도 하나가 포함된 이벤트를 전부 다 내려줍니다.(OR)\n' +
        '- 이벤트의 제목(title) 과 상세내용(body)에서 검색합니다.\n' +
        ' - categoryId : `모두선택:0` `동아리/소모임:1` `학생회:2` `간식나눔:3` `대회/공모전:4` `스터디:5` `구인:6` `기타:7` `교육/강연:8` \n'+
        ` - eventStatus : true 일 경우 해당 카테고리 중애서 진행 중인 이벤트만 가져옴, false 일 경우 진행 중인 이벤트와 상관없이 해당 카테고리 이벤트 다 가져옴\n`+
        '- pageNum 페이지 부터, 한 번에 pageSize 개씩, id 역순으로 ! \n' +
        '-  content는 빈 값으로 주면 400에러 납니다! 사용자에게 다시 입력하라고 알려주세여!\n' +
        '-  categoryId는 빈 값으로 주면 전체 내려줍니다.\n' +
        ' - pageNum은 0부터 시작입니다. \n' +
        ' - pageSize= 0이면 전체 이벤트 내려줌',

    query: {
        categoryId: stringAsInt.optional(),
        eventStatus: stringAsBoolean,
        content:z.string(),
        pageNum: stringAsInt.optional(),
        pageSize:stringAsInt.optional()
    },
    
    response: [EventResponseScheme]
});

export default defineRoute('get', '/events-by-search-with-filtering', schema, async (req, res) => {
    const {userId} = req;
    const {categoryId , eventStatus,content,pageNum,pageSize} = req.query;
    const eventInformation = await EventService.getEventsbySearchWithFiltering(userId,categoryId,eventStatus,content,pageNum, pageSize); // 페이징 적용

    return res.json(await Promise.all(eventInformation.map(e => e.toResponse(userId))));
});
