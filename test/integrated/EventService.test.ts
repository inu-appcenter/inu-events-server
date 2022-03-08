import {startTypeORM} from '../../src/infrastructure/db';
import EventService from '../../src/service/EventService';

describe('이벤트 서비스', () => {

  beforeAll(async () => {
    await startTypeORM();
  });

  it('댓글 단 이벤트 다 가져오기', async () => {
    const userId = 5;

    const events = await EventService.getEventsIveCommentedOn(userId);

    console.log(events);

    // 키야 잘된다 2022-03-01 새벽~
  });

  it('차단한 사용자의 것 빼고 가져오기', async () => {
    const requestorId = 1;

    const events = await EventService.getEvents(requestorId);

    console.log(events);
  });
});
