function requireEnv(key: string): string {
  const value = process.env[key];

  if (value == null) {
    throw new Error(`으아ㅏ아아아ㅏㅏㅏㄱ!!! 주어진 이름(${key})의 환경 변수를 찾을 수 없습니다!!!`);
  }

  return value;
}

export default {
  server: {
    jwt: {
      cookieName: 'inu-events-session-token',
      cookieOptions: {
        encoding: 'none',
        secure: false,
        httpOnly: true,
        clearInvalid: true,
        strictHeader: true,
      },
      key: process.env.JWT_KEY || 'hahahahahahahahaha',
      expiresIn: '24h',
    },
    storage: {
      image: {
        path: process.env.IMAGE_STORAGE_PATH || '/Users/',
      }
    },
  },

  external: {
    appleSignIn: { // 환경변수를 못찾는 것 같으니 일단 이렇게로 다 바꿔보자
      bundleID: process.env.BUNDLE_ID || 'com.INUAppCenter.Uniletter', /*iOS 기기*/
      serviceID: process.env.SERVICE_ID || 'com.INUAppCenter.Uniletter.SignIn', /*웹 앱(Android 포함)*/
      teamID: process.env.TEAM_ID || 'secret',
      keyIdentifier: process.env.KEY_IEDNTIFIER || 'secret',
      privateKey: process.env.PRIVATE_KEY || 'secret',
      redirectUri: 'https://uniletter.inuappcenter.kr/login/appleoauth/callback',

      // bundleID: requireEnv('BUNDLE_ID'), /*iOS 기기*/
      // serviceID: requireEnv('SERVICE_ID'), /*웹 앱(Android 포함)*/
      // teamID: requireEnv('TEAM_ID'),
      // keyIdentifier: requireEnv('KEY_IEDNTIFIER'),
      // privateKey: requireEnv('PRIVATE_KEY'),
      // redirectUri: 'https://uniletter.inuappcenter.kr/login/appleoauth/callback',
    }
  }
};
