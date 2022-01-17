import HttpError from './base/HttpError';

export default class UnprocessableEntity {
  static of = HttpError.with(422);
}
