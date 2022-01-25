import express, {RequestHandler} from 'express';
import {InvalidJwt, NotLoggedIn} from '../../common/errors/general';
import config from '../../config';
import {decodeJwt} from '../../common/utils/token';
import PathMatcher from '../libs/PathMatcher';

export type AuthorizerConfig = {
  exclude?: string[];
};

export function authorizer({exclude}: AuthorizerConfig): RequestHandler {
  const exclududPathMatcher = new PathMatcher(exclude);

  return (req, res, next) => {
    if (exclududPathMatcher.anyMatch(req.path)) {
      assignGetter(req, extractUserIdIfJwtExists(req));

      return next();
    }

    const jwtInRequest = extractJwt(req);
    if (jwtInRequest == null) {
      return next(NotLoggedIn());
    }

    try {
      const {userId} = decodeJwt(jwtInRequest);

      assignGetter(req, userId);

      return next();
    } catch (e) {
      return next(InvalidJwt());
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

function extractUserIdIfJwtExists(req: express.Request): number | undefined {
  const jwt = extractJwt(req);
  if (jwt == null) {
    return undefined;
  }

  try {
    return decodeJwt(jwt).userId;
  } catch (e) {
    return undefined;
  }
}
