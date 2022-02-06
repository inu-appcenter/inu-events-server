import {defineSchema} from '../../libs/schema';
import {string, z} from 'zod';
import MakeEvent from '../../../service/event/MakeEvent';
import {defineRoute} from '../../libs/route';
import {getGoogleOAuthInfo} from '../../../oauth';
import { getCustomRepository } from 'typeorm';
import ReturnUserInformation from '../../../service/ReturnUserInformation';

const schema = defineSchema({
    body: {
        //일단 accessToken으로 받아옴
        user: z.string(),
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
    const Userstatus = await ReturnUserInformation.returnUser(user);
    await MakeEvent.makeEvent(Userstatus,host,category,title, body, imageUuid, startAt, endAt);
    res.sendStatus(201); //success
});


