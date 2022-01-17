import InternalServerError from './http/InternalServerError';
import Unauthorized from './http/Unauthorized';

export const ThisWillNeverHappen = InternalServerError.of(
  'this_will_never_happen',
  '있을 수 없는 일이 일어났습니다.'
);

export const NotLoggedIn = Unauthorized.of('not_logged_in', '로그인해주세요!');

export const InvalidJwt = Unauthorized.of('invalid_jwt', '로그인해주세요!');
