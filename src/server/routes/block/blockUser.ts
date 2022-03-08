import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {authorizer} from '../../middleware/authorizer';
import {BlockUserRequestScheme} from "../../../entity/schemes";
import BlockingService from "../../../service/BlockingService";

const schema = defineSchema({
    summary: '사용자를 차단합니다.',
    description: '이미 차단한 사람 또 차단해도 안 뻗어요~',

    body: BlockUserRequestScheme
});

export default defineRoute('post', '/blocks', schema, authorizer(), async (req, res) => {
    const userId = req.requireUserId();

    await BlockingService.blockUser(userId, req.body);

    res.send();
});
