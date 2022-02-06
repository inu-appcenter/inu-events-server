import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import {getCustomRepository} from "typeorm";
import UpdateEvent from '../../../service/event/UpdateEvent';



const schema = defineSchema({
    params: {
        eventId: z.string(),
    },
    query: {
        host:z.string().optional(),
        category: z.string().optional(),
        title: z.string().optional(),
        body: z.string().optional(),
        imageUuid: z.string().optional(),
        startAt:z.date().optional(),
        endAt:z.date().optional(),
    }
});

export default defineRoute('patch', '/event/:eventId?', schema, async (req, res) => {
    const {eventId} = req.params;
    await UpdateEvent.patchEvent(eventId, req.query);
    return res.send(`event ${eventId}를 업데이트: ${JSON.stringify(req.query)}`);

});