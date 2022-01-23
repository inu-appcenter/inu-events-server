import {defineSchema} from '../../libs/schema';
import {string, z} from 'zod';
import EventRepository from '../../libs/application/user/event-repository';
import {defineRoute} from '../../libs/route';
import { getCustomRepository } from 'typeorm';
import User from '../../../entity/User';



const schema = defineSchema({
    body: {
        //user를 우찌해야하나.........
        user: z.object({
            id:z.number(),
            email:z.string(),
            nickname:z.string(),
            oauthProvider: z.string(),
            oauthId:z.string(),
            createdAt:z.date()
        }),
        host:z.string(),
        category: z.string(),
        title: z.string(),
        body: z.string(),
        imageUuid: z.string().optional(),
        startAt:z.date().optional(),
        endAt:z.date().optional(),
    }
});


export default defineRoute('post', '/event', schema, async (req, res) => {
    console.log('make Event!');
    const {user,host,category,title, body, imageUuid, startAt, endAt } = req.body;

    await getCustomRepository(EventRepository).createEvent(user,host,category,title, body, imageUuid, startAt, endAt);

    res.sendStatus(201); //success
});


