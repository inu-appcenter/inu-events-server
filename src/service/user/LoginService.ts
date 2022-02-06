import {getGoogleOAuthInfo} from '../../oauth';
import Unauthorized from '../../common/errors/http/Unauthorized';
import User from '../../entity/User';
import {createJwt} from '../../common/utils/token';
import {printError, stringifyError} from '../../common/utils/error';

const WrongAuth = Unauthorized.of(
  'wrong_auth',
  '인증 이상함!!!!!!!!!!'
);

type LoginResult = {
  jwt: string;

  email: string;
  oauthId: string;
  msg: string;
}

class LoginService {
  async login(accessToken: string): Promise<LoginResult> {
    try {
      const userInfo = await getGoogleOAuthInfo(accessToken);
      const existingUser = await User.findOne({where: {email: userInfo.email}});

      if (existingUser == null) {
        const newUser = await User.create({
          email: userInfo.email,
          nickname: 'test',
          oauthProvider: 'google',
          oauthId: userInfo.oauthId
        }).save();

        return {
          jwt: createJwt({userId: newUser.id}),

          email: `${userInfo.email}`,
          oauthId: `${userInfo.oauthId}`,
          msg: '회원가입이 완료되었습니다.'
        };
      } else {
        return {
          jwt: createJwt({userId: existingUser.id}),

          email: `${userInfo.email}`,
          oauthId: `${userInfo.oauthId}`,
          msg: '이미 가입된 사용자입니다.'
        };
      }
    } catch (e) {
      printError(e);

      throw WrongAuth();
    }
  }
}

export default new LoginService();
