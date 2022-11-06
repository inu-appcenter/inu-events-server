import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {authorizer} from '../../middleware/authorizer';
import { ReportResponseScheme} from '../../../entity/schemes';
import {stringAsInt} from "../../libs/zodTypes";
import ReportService from '../../../service/ReportService';


const schema = defineSchema({
    summary: '이벤트를 신고합니다.',
    description: 'DB 저장해볼게여',

    params: {
        eventId: stringAsInt,
    },
    response: [ReportResponseScheme]
});


export default defineRoute('post', '/reports/:eventId', schema, authorizer(), async (req, res) => {
    const userId = req.requireUserId();
    const {eventId} = req.params;


    await ReportService.ReportEvent(userId, eventId);
    return res.json({ userId:userId, eventId: eventId, msg: "신고되었습니다."});
    // res.send();
});
