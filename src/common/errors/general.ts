import InternalServerError from './http/InternalServerError';
import Unauthorized from './http/Unauthorized';
import NotFound from './http/NotFound';

export const ThisWillNeverHappen = InternalServerError.of(
  'this_will_never_happen',
  '있을 수 없는 일이 일어났습니다.'
);

export const NotLoggedIn = Unauthorized.of('not_logged_in', '로그인해주세요!');

export const InvalidJwt = Unauthorized.of('invalid_jwt', '로그인해주세요!');

export const NoSuchResource = NotFound.of('no_such_resource', '해당 리소스를 찾을 수 없습니다!');
