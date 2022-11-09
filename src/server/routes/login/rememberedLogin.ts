import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import LoginService from '../../../service/LoginService';
import config from '../../../config';

const schema = defineSchema({
  summary: 'OAuth 자동 로그인',
  description: '내 정보를 가져옵니다.',

  body: {
    id: z.number(),
    token: z.string()
  },

  response: {
    jwt: z.string(),
    userId: z.number(),
    rememberMeToken: z.string()
  }
});

export default defineRoute('post', '/login/remembered', schema, async (req, res) => {
  const {id, token} = req.body;

  const {user, jwt, rememberMeToken} = await LoginService.rememberedLogin(id, token);

  return res
    .header('token', jwt)
    .cookie(config.server.jwt.cookieName, jwt, config.server.jwt.cookieOptions)
    .json({
      jwt,

      userId: user.id,
      rememberMeToken,
    });
});


