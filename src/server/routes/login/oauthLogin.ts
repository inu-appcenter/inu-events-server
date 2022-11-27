import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import LoginService from '../../../service/LoginService';
import config from '../../../config';

const schema = defineSchema({
  tags: ['Login'],
  summary: '[이제안씀] OAuth 로그인',
  description: '[이제안씀!!!] 여기말고 /login/oauth/google 쓰세요!!!!!!!!!',

  body: {
    accessToken: z.string(),
  },

  response: {
    jwt: z.string(),
    userId: z.number(),
    rememberMeToken: z.string()
  }
});

/**
 * 이제 이 route는 사용되지 않습니다!!!!
 * /login/oauth/google을 대신 사용하세요!!!!!!!!!!!
 */
export default defineRoute('post', '/login/oauth', schema, async (req, res) => {
  const {accessToken} = req.body;

  const {user, jwt, rememberMeToken} = await LoginService.googleOAuthLogin(accessToken);

  return res
    .header('token', jwt)
    .cookie(config.server.jwt.cookieName, jwt, config.server.jwt.cookieOptions)
    .json({
      jwt,

      userId: user.id,
      rememberMeToken,
    });
});

