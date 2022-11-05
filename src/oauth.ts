import jwt from 'jsonwebtoken';
import appleSignin from 'apple-signin-auth';
import {OAuth2Client} from 'google-auth-library';
import InternalServerError from './common/errors/http/InternalServerError';
import config from './config';
import {log} from './common/utils/log';

export type OAuthInfo = {
  email: string;
  oauthId: string;
};


const NoEmail = InternalServerError.of(
  'no_email',
  '이메일이 없다니!!!!!!!!!!'
);

const NoSubject = InternalServerError.of(
  'no_subject',
  'Subject가 없다니!!!!!!!!!!'
);

/**
 * 구글에게 이 사용자의 이메일과 식별자(OpenID Connect에서는 subject라는 단어를 사용하나 여기에서는 oauthId라고 부를게여)를 물어봅니다.
 * OpenID Connect는 https://www.ibm.com/docs/ko/sva/9.0.7?topic=concepts-openid-connect 참조!
 *
 * @param accessToken 클라이언트가 들고 온 액세스 토큰.
 * @return object 성공하면 사용자 정보, 망하면 TypeError 던져요~
 */
export async function getGoogleOAuthInfo(accessToken: string): Promise<OAuthInfo> {
  const info = await new OAuth2Client().getTokenInfo(accessToken);

  const {email, sub} = info;

  if (email == null) {
    throw NoEmail();
  }

  if (sub == null) {
    throw NoSubject();
  }

  return {
    email: email,
    oauthId: sub,
  };
}


/**
 * 애플 로그인 (Token -> User Info)
 *
 */
export async function getAppleOAuthInfo(accessToken: string): Promise<OAuthInfo> {
  const clientID = config.external.appleSignIn.bundleID; /*일단 지금은 Apple iOS 기기용으로 기대중*/

  const info = await appleSignin.getAuthorizationToken(accessToken/*사실 auth code임. accessToken아님 엌ㅋ*/, {
    clientID,
    clientSecret: appleSignin.getClientSecret({
      clientID,
      ...config.external.appleSignIn
    }),
    ...config.external.appleSignIn
  });

  log(info)

  const {id_token, refresh_token} = info; /* info에서 refresh token은 버리나봄...*/

  const idTokenDecoded = jwt.decode(id_token) as { email: string, sub: string };

  const {email, sub} = idTokenDecoded;

  if (email == null) {
    throw NoEmail();
  }

  if (sub == null) {
    throw NoSubject();
  }

  return {
    email: email,
    oauthId: sub,
  };
}



