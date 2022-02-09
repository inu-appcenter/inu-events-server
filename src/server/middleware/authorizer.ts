import express, {RequestHandler} from 'express';
import {InvalidJwt, NotLoggedIn} from '../../common/errors/general';
import config from '../../config';
import {decodeJwt} from '../../common/utils/token';

export function authorizer<TParams = any, TQuery = any, TBody = any>(): RequestHandler<TParams, any, TBody, TQuery> {
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

function extractJwt(req: express.Request<any, any, any, any>): string | undefined {
  return req.header('token') ?? req.cookies[config.server.jwt.cookieName];
}
