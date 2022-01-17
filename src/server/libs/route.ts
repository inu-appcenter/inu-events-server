import {asyncHandler} from './handler';
import express, {RequestHandler} from 'express';
import {processRequest, RequestValidation} from '../middleware/zod';

export function defineRoute<TParams = any, TQuery = any, TBody = any>(
  method: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head',
  path: string,
  schema: RequestValidation<TParams, TQuery, TBody>,
  ...handlers: RequestHandler<TParams, any, TBody, TQuery>[]
): express.Router {
  const router = express.Router();

  router[method](path, processRequest(schema), ...handlers.map((h) => asyncHandler(h)));

  return router;
}
