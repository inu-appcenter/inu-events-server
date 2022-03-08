import {startTypeORM} from '../../src/infrastructure/db';
import CommentService from '../../src/service/CommentService';

describe('댓글 서비스', () => {
  beforeAll(async () => {
    await startTypeORM();
  });

  it('차단한 사용자의 것 빼고 가져오기', async () => {
    const requestorId = 1;

    const eventId = 1;

    const comments = await CommentService.getComments(eventId, requestorId);

    console.log(comments);
  });
});
