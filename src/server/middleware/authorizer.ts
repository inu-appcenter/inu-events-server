import express, {RequestHandler} from 'express';
import {InvalidJwt, NotLoggedIn} from '../../common/errors/general';
import config from '../../config';
import {decodeJwt} from '../../common/utils/token';
import PathMatcher from '../libs/PathMatcher';

export function authorizer(): RequestHandler {
  return (req, res, next) => {
    const jwtInRequest = extractJwt(req);
    if (jwtInRequest == null) {
      return next(NotLoggedIn());
    }

    try {
      decodeJwt(jwtInRequest);
      return next();
    } catch (e) {
      return next(InvalidJwt());
    }
  };
}

function extractJwt(req: express.Request): string | undefined {
  return req.header('token') ?? req.cookies[config.server.jwt.cookieName];
}
