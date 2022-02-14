import {startTypeORM} from '../../src/infrastructure/db';
import EventService from '../../src/service/EventService';
import CommentService from '../../src/service/CommentService';

describe('Cascading 삭제는 잘 작동할까...?', () => {
  it('이벤트를 지우면 댓글도 ㅃ2', async () => {
    await startTypeORM();

    expect((await CommentService.getComments(1)).length).toBeGreaterThanOrEqual(1);

    await EventService.deleteEvent(1);

    expect((await CommentService.getComments(1)).length).toBe(0);
  });
});
