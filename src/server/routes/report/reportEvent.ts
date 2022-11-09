import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import {authorizer} from '../../middleware/authorizer';
import {stringAsInt} from "../../libs/zodTypes";
import ReportService from '../../../service/ReportService';


const schema = defineSchema({
    summary: '이벤트를 신고합니다.',
    description: '신고하는 이벤트를 DB의 report table에 저장합니다. (댓글신고는 오류날 수 있습니다.)',

    params: {
        eventId: stringAsInt,
    },

});


export default defineRoute('post', '/reports/:eventId', schema, authorizer(), async (req, res) => {
    const userId = req.requireUserId();
    const {eventId} = req.params;
    await ReportService.ReportEvent(userId, eventId);

    res.send();
});
