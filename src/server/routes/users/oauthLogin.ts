import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import LoginService from '../../../service/LoginService';
import config from '../../../config';

const schema = defineSchema({
  body: {
    accessToken: z.string().optional(),
  }
});

export default defineRoute('post', '/login/oauth', schema, async (req, res) => {
  const {accessToken} = req.body;

  const {user, jwt, rememberMeToken} = await LoginService.oauthLogin(accessToken);

  return res
    .header('token', jwt)
    .cookie(config.server.jwt.cookieName, jwt, config.server.jwt.cookieOptions)
    .json({
      jwt,

      userId: user.id,
      rememberMeToken,
    });
});


