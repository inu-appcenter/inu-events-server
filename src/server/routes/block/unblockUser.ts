import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {authorizer} from '../../middleware/authorizer';
import {BlockUserRequestScheme} from "../../../entity/schemes";
import BlockingService from "../../../service/BlockingService";

const schema = defineSchema({
    tags: ['Block'],
    summary: '사용자 차단을 해제합니다.',
    description: '차단 안한 사람 또 해제해도 안 뻗어요~',

    body: BlockUserRequestScheme
});

export default defineRoute('delete', '/blocks', schema, authorizer(), async (req, res) => {
    const userId = req.requireUserId();

    await BlockingService.unblockUser(userId, req.body);

    res.send();
});
