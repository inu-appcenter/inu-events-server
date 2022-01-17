import HttpError from './base/HttpError';

export default class NotImplemented {
  static of = HttpError.with(501);
}
