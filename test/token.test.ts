import {createJwt} from '../src/common/utils/token';

describe('토큰 만들기', () => {
  it('테스트용', async () => {
    console.log(createJwt({userId: 1}));
  });
});
