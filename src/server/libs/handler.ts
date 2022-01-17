import {RequestHandler} from 'express';

/**
 * Express 4에서는 기본적으로 Promise rejection을 잡지 못합니다.
 * 그래서 이걸로 한 번 감싸줍니다.
 *
 * @param handler 원래 핸들러.
 */
export function asyncHandler<TParams = any, TQuery = any, TBody = any>(
  handler: RequestHandler<TParams, any, TBody, TQuery>
): RequestHandler<TParams, any, TBody, TQuery> {
  return (req, res, next) => {
    return Promise.resolve(handler(req, res, next)).catch(next);
  };
}
