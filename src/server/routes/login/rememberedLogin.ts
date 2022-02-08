import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import LoginService from '../../../service/LoginService';
import config from '../../../config';
import {stringAsInt} from '../../libs/zodTypes';

const schema = defineSchema({
  body: {
    id: z.number(),
    token: z.string()
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


