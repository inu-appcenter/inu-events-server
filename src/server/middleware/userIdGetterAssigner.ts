import express, {RequestHandler} from 'express';
import {InvalidJwt, NotLoggedIn} from '../../common/errors/general';
import config from '../../config';
import {decodeJwt} from '../../common/utils/token';
import PathMatcher from '../libs/PathMatcher';

export function userIdGetterAssigner(): RequestHandler {
  return (req, res, next) => {
    const jwtInRequest = extractJwt(req);
    if (jwtInRequest == null) {
      assignGetter(req);

      return next();
    }

    try {
      const {userId} = decodeJwt(jwtInRequest);

      assignGetter(req, userId);

      return next();
    } catch (e) {
      return next();
    }
  };
}

function assignGetter(req: express.Request, initial?: number) {
  Object.defineProperty(req, 'userId', {
    get() {
      if (initial) {
        return initial;
      } else {
        throw NotLoggedIn();
      }
    },
  });
}

function extractJwt(req: express.Request): string | undefined {
  return req.header('token') ?? req.cookies[config.server.jwt.cookieName];
}
