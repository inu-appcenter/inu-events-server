import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';
import {stringAsInt,stringAsBoolean} from '../../libs/zodTypes';
import {EventResponseScheme} from '../../../entity/schemes';

const schema = defineSchema({
  tags: ['Events'],
  summary: '카테고리 별로 필터링해서 가져옵니다',
  description: ' - categoryId : `모두선택:0` `동아리/소모임:1` `학생회:2` `간식나눔:3` `대회/공모전:4` `스터디:5` `구인:6` `기타:7` `교육/강연:8` \n'+
  ` - eventStatus : true 일 경우 해당 카테고리 중애서 진행 중인 이벤트만 가져옴, false 일 경우 진행 중인 이벤트와 상관없이 해당 카테고리 이벤트 다 가져옴\n`+
  ` - 페이징 적용(/get events 참고)`,

  query: {
    categoryId: stringAsInt,
    eventStatus: stringAsBoolean,
    pageNum: stringAsInt.optional(),
    pageSize:stringAsInt.optional()
  },

  response: EventResponseScheme,
});

export default defineRoute('get', '/events-by-category', schema, async (req, res) => {
  const {userId} = req;
  const {categoryId , eventStatus,pageNum,pageSize} = req.query;

  const eventCategoryInformation = await EventService.getCategorybyFiltering(userId,categoryId,eventStatus,pageNum,pageSize);

  return res.json(await Promise.all(eventCategoryInformation.map(e => e.toResponse(userId))));
});
