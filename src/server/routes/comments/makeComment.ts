import {defineSchema} from '../../libs/schema';
import {string, z} from 'zod';
import MakeComment from '../../../service/comment/MakeComment';
import {defineRoute} from '../../libs/route';
import {getGoogleOAuthInfo} from '../../../oauth';
import { getCustomRepository } from 'typeorm';
import ReturnUserInformation from '../../../service/ReturnUserInformation';
import ReturnEventInformation from '../../../service/ReturnEventInformation';
const schema = defineSchema({
    body: {
        //일단 accessToken으로 받아옴
        user: z.string(),
        //일단 event id로 받아옴.
        event:z.string(),
        content: z.string(),
    }
});

export default defineRoute('post', '/comment', schema, async (req, res) => {
    console.log('make coomet!');
    const {user,event,content} = req.body;
    const Userstatus = await ReturnUserInformation.returnUser(user);
    const Eventstatus = await ReturnEventInformation.returnEvent(event);
    await MakeComment.makeComment(Userstatus,Eventstatus,content);
    res.sendStatus(201); //success
});
