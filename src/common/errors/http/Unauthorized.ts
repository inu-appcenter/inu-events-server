import HttpError from './base/HttpError';

export default class Unauthorized {
  static of = HttpError.with(401);
}
