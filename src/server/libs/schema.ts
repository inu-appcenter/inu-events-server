import {z, ZodRawShape} from 'zod';
import {ZodArrayOfRawShape} from '../../common/utils/zod';

type RawSchema<TParams extends ZodRawShape,
  TQuery extends ZodRawShape,
  TBody extends ZodRawShape,
  TObjectResponse extends ZodRawShape,
  TArrayResponse extends ZodArrayOfRawShape> = {
  tags?: string[];
  summary?: string;
  description?: string;

  params?: TParams;
  query?: TQuery;
  body?: TBody;

  response?: TObjectResponse | TArrayResponse;
};

export function defineSchema<TParams extends ZodRawShape,
  TQuery extends ZodRawShape,
  TBody extends ZodRawShape,
  TObjectResponse extends ZodRawShape,
  TArrayResponse extends ZodArrayOfRawShape>(raw: RawSchema<TParams, TQuery, TBody, TObjectResponse, TArrayResponse>) {
  return {
    tags: raw.tags,
    summary: raw.summary,
    description: raw.description,

    params: raw.params ? z.object(raw.params) : undefined,
    query: raw.query ? z.object(raw.query) : undefined,
    body: raw.body ? z.object(raw.body) : undefined,

    response: raw.response ? (Array.isArray(raw.response) ? z.array(z.object(raw.response[0])) : z.object(raw.response)) : undefined
  };
}
