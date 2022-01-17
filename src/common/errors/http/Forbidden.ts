import HttpError from './base/HttpError';

export default class Forbidden {
  static of = HttpError.with(403);
}
