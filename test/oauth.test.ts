import {getGoogleOAuthInfo} from '../src/oauth';

describe('구글 OAuth 라이브러리', () => {
  it('터뜨리기', async () => {
    try {
      const info = await getGoogleOAuthInfo("아무거나ㅏㅏㅏㅏ절때안유효한거");
      console.log(info);
    } catch (e) {
      if (e instanceof TypeError) {
        console.log('TypeError 발생! 고럼고럼 이래야지');
      } else {
        console.error('이건모임??????????');
      }
    }
  });

  it('액세스 토큰이 멀쩡하면 작동해야 함!', async () => {
    const info = await getGoogleOAuthInfo('ya29.A0ARrdaM-95ti0QCOehpmI6z6lu3mvs1EvT_I6l_NvC789ZgG7gTh48uktOuBslmSsMZK1jMSh2Ob6nlZGmtDbNUJhCksBanOnVYevdkIo52YK7xktsgte8ikgb-ujFbdbwaXZFug_aeA_ImhBXDAp043Dteay');

    console.log(info);
  });
});
