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
        path: process.env.IMAGE_STORAGE_PATH || '/Users/potados/Desktop',
      }
    }
  }
};
