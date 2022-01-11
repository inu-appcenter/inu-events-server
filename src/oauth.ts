import {OAuth2Client} from 'google-auth-library';

/**
 * 구글에게 이 사용자의 이메일과 식별자(OpenID Connect에서는 subject라는 단어를 사용하나 여기에서는 oauthId라고 부를게여)를 물어봅니다.
 * OpenID Connect는 https://www.ibm.com/docs/ko/sva/9.0.7?topic=concepts-openid-connect 참조!
 *
 * @param accessToken 클라이언트가 들고 온 액세스 토큰.
 * @return object 성공하면 사용자 정보, 망하면 TypeError 던져요~
 */
export async function getGoogleOAuthInfo(accessToken: string) {
  const info = await new OAuth2Client().getTokenInfo(accessToken);

  return {
    email: info.email,
    oauthId: info.sub,
  };
}
