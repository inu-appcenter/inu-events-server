import HttpError from './base/HttpError';

export default class BadRequest {
  static of = HttpError.with(400);
}
