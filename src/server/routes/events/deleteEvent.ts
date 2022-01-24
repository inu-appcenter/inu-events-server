import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import {getCustomRepository} from "typeorm";
import EventRepository from "../../libs/application/user/event-repository";


const schema = defineSchema({
    params: {
        eventId: z.string(),
    },
});

export default defineRoute('delete','/event/:eventId?', schema, async (req, res) => {

    const {eventId} = req.params;
    await getCustomRepository(EventRepository).deleteEvent(eventId);
    return res.send(`event ${eventId}를 삭제했습니다.`);
    //res.send();
});
