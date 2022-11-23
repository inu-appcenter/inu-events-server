import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';
import {stringAsInt,stringAsBoolean} from '../../libs/zodTypes';
import {EventResponseScheme} from '../../../entity/schemes';

const schema = defineSchema({
  summary: '카테고리 별로 필터링해서 가져옵니다',
  description: 'categoryId => 선택없음:0 동아리/소모임:1 학생회:2 간식나눔:3 대회/공모전:4 스터디:5 구인:6 기타:7 진행중인 이벤트: 8 | eventStatus => true 일 경우 해당 카테고리 중애서 진행 중인 이벤트만 가져옴, false 일 경우 진행 중인 이벤트와 상관없이 해당 카테고리 이벤트 다 가져옴',

  query: {
    categoryId: stringAsInt,
    eventStatus: stringAsBoolean,
  },

  response: EventResponseScheme,
});

export default defineRoute('get', '/events-by-category', schema, async (req, res) => {
  const {categoryId , eventStatus} = req.query;

  const eventCategoryInformation = await EventService.getCategorybyFiltering(categoryId,eventStatus);
  return res.json(eventCategoryInformation);
});