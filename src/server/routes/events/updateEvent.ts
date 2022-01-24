import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import {getCustomRepository} from "typeorm";
import EventRepository from "../../libs/application/user/event-repository";


const schema = defineSchema({
    params: {
        eventId: z.string(),
    },
    query: {
        //업데이트 도와줘요~.~. 잘안됨
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
    const {host,category,title,body,imageUuid,startAt,endAt} = req.query;
    await getCustomRepository(EventRepository).patchEvent(eventId, host,category,title,body,imageUuid,startAt,endAt);
    return res.send(`event ${eventId}를 업데이트 하였습니다.`);
    //res.send();
});