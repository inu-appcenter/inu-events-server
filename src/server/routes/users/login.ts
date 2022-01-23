import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import UserRepository from '../../libs/application/user/user-repository';
import {defineRoute} from '../../libs/route';
import {getGoogleOAuthInfo} from '../../../oauth';
import Unauthorized from '../../../common/errors/http/Unauthorized';
import { getCustomRepository } from 'typeorm';
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
    const existEmail = await getCustomRepository(UserRepository).checkEmail(userInfo.email);
    if (existEmail) {
      return res.send(`이미 화원가입된 사용자 입니다. 이메일: ${userInfo.email}`);
    }
    else {
      await getCustomRepository(UserRepository).createUser(userInfo.email,"test","google",userInfo.oauthId);
    }
    return res.send(`당신 정보는 ${userInfo.email}`);

  } catch (e) {
    throw WrongAuth();
  }
});


