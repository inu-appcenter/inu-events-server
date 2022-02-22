import {asyncHandler} from './handler';
import express, {RequestHandler} from 'express';
import {processRequest, RequestValidation} from '../middleware/zod';
import {ZodArray, ZodObject, ZodSchema, ZodTypeDef} from 'zod';
import SpecStorage from './SpecStorage';

export function defineRoute<TParams = any, TQuery = any, TBody = any, TResponse = any>(
  method: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head',
  path: string,
  schema: RequestValidation<TParams, TQuery, TBody> & { summary?: string; description?: string; response?: ZodSchema<TResponse, ZodTypeDef, any> | ZodArray<any> },
  ...handlers: RequestHandler<TParams, any, TBody, TQuery>[]
): express.Router {

  SpecStorage.addSpec({
    method: method,
    path: path,

    summary: schema.summary,
    description: schema.description,

    params: schema.params as ZodObject<any>,
    query: schema.query as ZodObject<any>,
    body: schema.body as ZodObject<any>,

    response: schema.response as (ZodObject<any> | ZodArray<any>),
  });

  const router = express.Router();

  router[method](path, processRequest(schema), ...handlers.map((h) => asyncHandler(h)));

  return router;
}
