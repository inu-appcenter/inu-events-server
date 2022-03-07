import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {authorizer} from '../../middleware/authorizer';
import {BlockUserRequestScheme} from "../../../entity/schemes";
import BlockingService from "../../../service/BlockingService";


const schema = defineSchema({
    summary: '차단할 사용자를 지정합니다.',
    description: '네.',

    body: BlockUserRequestScheme
});

export default defineRoute('post', '/blockuser', schema, authorizer(), async (req, res) => {
    const userId = req.requireUserId();
    await BlockingService.makeBlock(userId, req.body);

    res.send();
});
