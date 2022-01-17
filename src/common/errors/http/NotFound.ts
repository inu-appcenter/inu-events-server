import HttpError from './base/HttpError';

export default class NotFound {
  static of = HttpError.with(404);
}
