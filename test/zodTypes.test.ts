import {isISOString} from '../src/server/libs/zodTypes';

describe('날짜시간 스트링 표현', () => {
  it('뒤에 시간대 없이 쓴 ISO-8601 스트링은 유효할까?', async () => {
    expect(isISOString('2022-02-25T18:00:00')).toBeTruthy();
  });

  it('+0900을 달면?', async () => {
    expect(isISOString('2022-02-25T18:00:00+0900')).toBeTruthy();
  });

  it('moment가 만들어준 스트링은?', async () => {
    expect(isISOString('2022-02-24T04:40:30.000+09:00')).toBeTruthy();
  });

  it('이것도 되나?', async () => {
    expect(isISOString('2022-02-24 04:40:30')).toBeTruthy();
  });
});
