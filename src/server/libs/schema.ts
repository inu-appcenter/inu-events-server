import {ZodRawShape} from 'zod/lib/types';
import {z} from 'zod';

type RawSchema<
  TParams extends ZodRawShape,
  TQuery extends ZodRawShape,
  TBody extends ZodRawShape
> = {
  params?: TParams;
  query?: TQuery;
  body?: TBody;
};

export function defineSchema<
  TParams extends ZodRawShape,
  TQuery extends ZodRawShape,
  TBody extends ZodRawShape
>(raw: RawSchema<TParams, TQuery, TBody>) {
  return {
    params: raw.params ? z.object(raw.params) : undefined,
    query: raw.query ? z.object(raw.query) : undefined,
    body: raw.body ? z.object(raw.body) : undefined,
  };
}
