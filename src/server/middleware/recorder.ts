import {RequestHandler} from 'express';
import {redacted} from '../../common/utils/redacted';

export function recorder(): RequestHandler {
  return async (req, res, next) => {
    const {path, params, query, body} = req;

    const info = {
      cookies: req.cookies,
      remoteAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      userAgent: req.headers['user-agent'],
      path: path,
      params: redacted(params),
      query: redacted(query),
      body: redacted(body),
    };

    console.log(`요청을 받았습니다: ${JSON.stringify(info)}`);

    next();
  };
}
