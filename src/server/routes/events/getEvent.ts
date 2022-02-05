import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import {getCustomRepository} from "typeorm";
import EventRepository from "../../libs/application/events/event-repository";


const schema = defineSchema({
    params: {
        eventId: z.string(),
    },
});

export default defineRoute('get', '/event/:eventId?', schema, async (req, res) => {

    const {eventId} = req.params;
    const Event_Information = await getCustomRepository(EventRepository).getEvent(eventId);
    // return res.send(`event ${eventId}의 id : ${Event_Information.id} , host : ${Event_Information.host} , category : ${Event_Information.category} , title : ${Event_Information.title} , body : ${Event_Information.body} , imageUuid: ${Event_Information.imageUuid} , startAt : ${Event_Information.startAt} , endAt : ${Event_Information.endAt} , createAt : ${Event_Information.createdAt}
    //                  event를 올린 사용자 id :${Event_Information.user.id} , email : ${Event_Information.user.email} , nickname :${Event_Information.user.nickname} , oauthProvider : ${Event_Information.user.oauthProvider} , createAt :${Event_Information.user.createdAt}`);
    return res.json(Event_Information)
});