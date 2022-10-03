import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import LoginService from '../../../service/LoginService';
import config from '../../../config';

const schema = defineSchema({
  summary: 'Apple OAuth 로그인 (현재는 iOS 전용)',
  description: '내 정보를 가져옵니다.',

  body: {
    accessToken: z.string(),
  },

  response: {
    jwt: z.string(),
    userId: z.number(),
    rememberMeToken: z.string()
  }
});

export default defineRoute('post', '/login/oauth/apple', schema, async (req, res) => {
  const {accessToken} = req.body;

  const {user, jwt, rememberMeToken} = await LoginService.appleOAuthLogin(accessToken);

  return res
    .header('token', jwt)
    .cookie(config.server.jwt.cookieName, jwt, config.server.jwt.cookieOptions)
    .json({
      jwt,

      userId: user.id,
      rememberMeToken,
    });
});

