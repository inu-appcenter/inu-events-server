function requireEnv(key: string): string {
  const value = process.env[key];

  if (value == null) {
    throw new Error(`으아ㅏ아아아ㅏㅏㅏㄱ!!! 주어진 이름(${key})의 환경 변수를 찾을 수 없습니다!!!`);
  }

  return value.replace(/\\n/g, '\n'); // error:0909006C:PEM routines:get_name:no start line\n
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
        path: process.env.IMAGE_STORAGE_PATH || '/Users/selen/',
      }
    },
  },

  external: {
    appleSignIn: { //
      bundleID: requireEnv('BUNDLE_ID'), /*iOS 기기*/
      serviceID: requireEnv('SERVICE_ID'), /*웹 앱(Android 포함)*/
      teamID: requireEnv('TEAM_ID'),
      keyIdentifier: requireEnv('KEY_IEDNTIFIER'),
      privateKey: requireEnv('PRIVATE_KEY'),
      redirectUri: 'https://uniletter.inuappcenter.kr/login/appleoauth/callback',
    }
  }
};
