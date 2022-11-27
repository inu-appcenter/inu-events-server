import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {authorizer} from '../../middleware/authorizer';
import { ReportResponseScheme} from '../../../entity/schemes';
import {stringAsInt} from "../../libs/zodTypes";

const schema = defineSchema({
    tags: ['Report'],
    summary: '이벤트를 신고합니다.',
    description: '임시로 일단 리턴만 해줌',

    params: {
        eventId: stringAsInt,
    },
    response: [ReportResponseScheme]
});


export default defineRoute('post', '/reports/:eventId', schema, authorizer(), async (req, res) => {
    const userId = req.requireUserId();
    const {eventId} = req.params;

    return res.json({ userId:userId, eventId: eventId, msg: "신고되었습니다."});
});
