import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';
import {EventResponseScheme} from '../../../entity/schemes';
import {extractJwt} from "../../middleware/authorizer";
import Event from "../../../entity/Event";


const schema = defineSchema({
  summary: '행사를 다 가져옵니다.',
  description: '싹다!',

  response: [EventResponseScheme]
});

export default defineRoute('get', '/events', schema, async (req, res) => {
  const {userId} = req;

  // 잘 안됨 ㅠ
  let eventInformation;
  if(extractJwt(req)) { //로그인 정보가 있는 경우
    console.log("로그인 정보 있음!");
    eventInformation = await EventService.getEventsWithoutBlockedUser(req.requireUserId());
  }else{
    // 로그인 정보가 없는 경우 모든 이벤트 다 가져옴!
    console.log("로그인 정보 없어요");
    eventInformation = await EventService.getEvents();
  }
  return res.json(await Promise.all(eventInformation.map(e => e.toResponse(userId))))
});
