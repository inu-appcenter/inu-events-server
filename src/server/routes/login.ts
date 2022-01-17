import {defineSchema} from '../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../libs/route';
import {getGoogleOAuthInfo} from '../../oauth';
import Unauthorized from '../../common/errors/http/Unauthorized';

const schema = defineSchema({
  body: {
    accessToken: z.string(),
  }
});

const WrongAuth = Unauthorized.of(
  'wrong_auth',
  '인증 이상함!!!!!!!!!!'
);

export default defineRoute('post', '/login', schema, async (req, res) => {
  const {accessToken} = req.body;

  try {
    const userInfo = await getGoogleOAuthInfo(accessToken);

    return res.send(`당신 이메일은 ${userInfo.email}`);
  } catch (e) {
    throw WrongAuth();
  }
});


