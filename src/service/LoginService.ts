import {getGoogleOAuthInfo} from '../oauth';
import Unauthorized from '../common/errors/http/Unauthorized';
import User from '../entity/User';
import {createJwt} from '../common/utils/token';
import {printError} from '../common/utils/error';
import {generateUUID} from '../common/utils/uuid';
import {log} from '../common/utils/log';

const WrongAuth = Unauthorized.of(
  'wrong_auth',
  '인증 이상함!!!!!!!!!!'
);

const NoSuchUser = Unauthorized.of(
  'no_such_user',
  '그런 사람 또 없습니다~'
);

const InvalidToken = Unauthorized.of(
  'invalid_remember_me_token',
  '유효하지 않은 자동로그인 토큰입니다.'
);

type LoginResult = {
  user: User;

  jwt: string;
  rememberMeToken: string;
}

class LoginService {
  /**
   * 구글 로그인 해서 액세스 토큰으로 로그인.
   * @param accessToken
   */
  async oauthLogin(accessToken: string): Promise<LoginResult> {
    const {email, oauthId} = await this.resolveUserInfoFromGoogle(accessToken);

    const user = await this.getOrCreateUser(email, oauthId);

    return this.onSuccess(user);
  }

  private async resolveUserInfoFromGoogle(accessToken: string) {
    try {
      return await getGoogleOAuthInfo(accessToken);
    } catch (e: any) {
      printError(e);

      throw WrongAuth();
    }
  }

  private async getOrCreateUser(email: string, oauthId: string): Promise<User> {
    const found = await User.findOne({where: {oauthId}});
    if (found != null) {
      return found;
    }

    return await User.create({
      email: email,
      nickname: `haha-${new Date().getTime()}`,
      oauthProvider: 'google',
      oauthId: oauthId,
      rememberMeToken: generateUUID(),
    }).save();
  }

  /**
   * 자동 로그인.
   * @param id
   * @param rememberMeToken
   */
  async rememberedLogin(id: number, rememberMeToken: string): Promise<LoginResult> {
    const user = await User.findOne(id);
    if (user == null) {
      throw NoSuchUser();
    }

    const tokenMatches = user.rememberMeToken == rememberMeToken;

    if (!tokenMatches) {
      throw InvalidToken();
    }

    return this.onSuccess(user);
  }

  private async onSuccess(user: User) {
    const jwt = createJwt({userId: user.id});
    const rememberMeToken = generateUUID();

    user.rememberMeToken = rememberMeToken;
    await user.save();

    log(`사용자 ${user.id} 로그인 완료! jwt는 ${jwt}`);

    return {user, jwt, rememberMeToken};
  }
}

export default new LoginService();
