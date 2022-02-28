import {sendFcm} from '../../src/infrastructure/fcm';

describe('알림을 쏴보자', () => {
  it('희지쿠쨩에서 알림 빵야><', async () => {
    await sendFcm(
      'e0B7-WajReiH9kuxYzKWu4:APA91bGmx72rtVi5OY_mEx18TAlwWlfs2ymcRHO7OXuevDTOBrZnIR4bz2fSQXaAsUKxF43WYMJG31fwDRn9kUn2_tizD2YfUgvLTiSoHmDjM4ng9zFWlXP6xFx9kzW3lLEHxrHTlkZO',
      '아아 들리시면 1번',
      '안들리시면 2번'
    );
  });
})
