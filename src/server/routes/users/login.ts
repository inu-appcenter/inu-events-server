import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import LoginService from '../../../service/LoginService';
import config from '../../../config';

const schema = defineSchema({
  body: {
    accessToken: z.string(),
  }
});

export default defineRoute('post', '/login', schema, async (req, res) => {
  const {accessToken} = req.body;

  const {jwt, email, oauthId, msg} = await LoginService.login(accessToken);

  return res
    .header('token', jwt)
    .cookie(config.server.jwt.cookieName, jwt, config.server.jwt.cookieOptions)
    .json({
      jwt,
      email,
      oauthId,
      msg
    });
});


