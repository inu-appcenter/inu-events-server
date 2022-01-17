export default {
  server: {
    jwt: {
      cookieName: 'inu-events-session-token',
      key: process.env.JWT_KEY || 'hahahahahahahahaha',
      expiresIn: '24h',
    }
  }
};
