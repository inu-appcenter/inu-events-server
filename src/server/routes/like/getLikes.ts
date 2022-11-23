import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {authorizer} from '../../middleware/authorizer';
import LikeService from '../../../service/LikeService';
import {EventResponseScheme} from '../../../entity/schemes';
import {stringAsInt} from "../../libs/zodTypes";

const schema = defineSchema({
  summary: '행사 좋아요(북마크) 가져오기 (페이징 적용)',
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

export default defineRoute('get', '/likes', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();
  const {pageNum, pageSize} = req.query;

  const likedEvents = await LikeService.getLikedEvents(userId, pageNum, pageSize); // 페이징 적용

  return res.json(await Promise.all(likedEvents.map(e => e.toResponse(userId))))
});
