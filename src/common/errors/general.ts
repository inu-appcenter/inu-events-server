import InternalServerError from './http/InternalServerError';

export const ThisWillNeverHappen = InternalServerError.of(
  'this_will_never_happen',
  '있을 수 없는 일이 일어났습니다.'
);
