import PathMatcher from '../src/server/libs/PathMatcher';

describe('Ant 패턴으로 경로 허용리스트 처리하기', () => {
  it('허용리스트에 /user만 있구 요청 경로가 /user 이면 해당함', async () => {
    const matcher = new PathMatcher(['/user']);

    expect(matcher.anyMatch('/user')).toBe(true);
  });

  it('허용리스트에 /user만 있구 요청 경로가 /haha 이면 해당 안함', async () => {
    const matcher = new PathMatcher(['/user']);

    expect(matcher.anyMatch('/haha')).toBe(false);
  });

  it('허용리스트에 /u*만 있구 요청 경로가 /uuuuuuu 이면 해당함', async () => {
    const matcher = new PathMatcher(['/u*']);

    expect(matcher.anyMatch('/uuuuuuu')).toBe(true);
  });

  it('허용리스트에 /user/**만 있구 요청 경로가 /user 아래 아무거나이면 해당함', async () => {
    const matcher = new PathMatcher(['/user/**']);

    expect(matcher.anyMatch('/user')).toBe(true);
    expect(matcher.anyMatch('/user/')).toBe(true);
    expect(matcher.anyMatch('/user/haha')).toBe(true);
    expect(matcher.anyMatch('/user/hoho/hihi/hit')).toBe(true);
  });

  it('허용리스트에 있는 것 중 하나만 매치돼도 해당함', async () => {
    const matcher = new PathMatcher(['/a', '/b', '/c', '/user', '/d']);

    expect(matcher.anyMatch('/user')).toBe(true);
  });
});
