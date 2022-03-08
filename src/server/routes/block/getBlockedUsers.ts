import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {authorizer} from '../../middleware/authorizer';
import {BlockResponseScheme} from '../../../entity/schemes';
import BlockingService from '../../../service/BlockingService';

const schema = defineSchema({
  summary: '차단 목록(=내가 차단한 사용자) 불러오기',
  description: 'ㅎㅎ',

  response: [BlockResponseScheme]
});

export default defineRoute('get', '/blocks', schema, authorizer(), async (req, res) => {
  const userId = req.requireUserId();

  const blocks = await BlockingService.getBlocks(userId);

  return res.json(await Promise.all(blocks.map(b => b.toResponse(userId))))
});
