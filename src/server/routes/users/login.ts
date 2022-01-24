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
      return res.json({"email": `${userInfo.email}`, "oauthId":  `${userInfo.oauthId}`, "msg" : "이미 가입된 사용자입니다."});
    }
    else {
      await getCustomRepository(UserRepository).createUser(userInfo.email,"test","google",userInfo.oauthId);
    }
    return res.json({"email": `${userInfo.email}`, "oauthId":  `${userInfo.oauthId}`,  "msg" : "회원가입이 완료되었습니다."});

  } catch (e) {
    throw WrongAuth();
  }
});


