import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {authorizer} from '../../middleware/authorizer';
import FcmService from '../../../service/FcmService';
import {z} from 'zod';

const schema = defineSchema({
  tags: ['FCM'],
  summary: 'FCM 토큰 등록',
  description: '사용자에게 딸린 FCM 토큰을 업데이트합니다. 기존의 것을 덮어씁니다.',

  body: {
    token: z.string()
  }
});

export default defineRoute('post', '/fcm/token', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();
  const {token} = req.body;

  await FcmService.setFcmToken(userId, token);

  return res.send();
});
