import HttpError from './base/HttpError';

export default class InternalServerError {
  static of = HttpError.with(500);
}
