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
      key: requireEnv('JWT_KEY'), // 이게 없었어 일단 재배포를 하기위해 임시로..
      expiresIn: '24h',
    },
    storage: {
      image: {
        path: requireEnv('IMAGE_STORAGE_PATH'),
      }
    },
  },

  external: {
    appleSignIn: {
      bundleID: requireEnv('BUNDLE_ID'), /*iOS 기기*/
      serviceID: requireEnv('SERVICE_ID'), /*웹 앱(Android 포함)*/
      teamID: requireEnv('TEAM_ID'),
      keyIdentifier: requireEnv('KEY_IEDNTIFIER'),
      privateKey: requireEnv('PRIVATE_KEY'),
      redirectUri: 'https://uniletter.inuappcenter.kr/login/appleoauth/callback',
    }
  }
};
