import {defineSchema} from '../../libs/schema';
import {string, z} from 'zod';
import CommentRepository from '../../libs/application/user/comment-repository';
import {defineRoute} from '../../libs/route';
import {getGoogleOAuthInfo} from '../../../oauth';
import { getCustomRepository } from 'typeorm';




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
    const userInfo = await getGoogleOAuthInfo(user);
    const Userstatus = await getCustomRepository(CommentRepository).returnUser(userInfo.email);
    const Eventstatus = await getCustomRepository(CommentRepository).returnEvent(event);
    console.log(Userstatus);
    console.log(Eventstatus);
    await getCustomRepository(CommentRepository).createComment(Userstatus,Eventstatus,content);

    res.sendStatus(201); //success
});
