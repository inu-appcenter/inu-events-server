import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import {getCustomRepository} from "typeorm";
import  UpdateComment from '../../../service/comment/UpdateComment';


const schema = defineSchema({
    params: {
        commentId: z.string(),
    },
    query: {
        content:z.string()
    }
});

export default defineRoute('patch', '/comment/:commentId?', schema, async (req, res) => {

    const {commentId} = req.params;
    await UpdateComment.patchComment(commentId, req.query);
    return res.send(`comment ${commentId}를 업데이트 : ${JSON.stringify(req.query)}`);
    //res.send();
});