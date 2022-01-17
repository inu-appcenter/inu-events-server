import HttpError from './base/HttpError';

export default class Conflict {
  static of = HttpError.with(409);
}
