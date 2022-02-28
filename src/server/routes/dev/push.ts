import {defineSchema} from '../../libs/schema';
import {EventResponseScheme} from '../../../entity/schemes';
import {defineRoute} from '../../libs/route';
import {stringAsInt} from '../../libs/zodTypes';
import {z} from 'zod';
import FcmService from '../../../service/FcmService';
import UserService from '../../../service/UserService';
import assert from 'assert';
import {CantDoThat} from '../../../common/errors/general';

const schema = defineSchema({
  summary: '[테스트] 푸시알림을 보냅니다.',
  description: '개발용입니다!',

  query: {
    to: stringAsInt,
    title: z.string().optional(),
    body: z.string().optional()
  },

  response: EventResponseScheme,
});

export default defineRoute('get', '/push', schema, async (req, res) => {
  const {to, title, body} = req.query;

  const user = await UserService.getUser(to);

  assert(user.fcmToken, CantDoThat(`${user.toString()}에 fcm 토큰이 없어요!`));

  await FcmService.send(user, title ?? '너는 정말 최고야', body ?? '정말 잘 하고 있어 응원할게');

  return res.send(`ㅇㅋㅇㅋ ${user.toString()}한테 보냄 ㅎ`);
});
