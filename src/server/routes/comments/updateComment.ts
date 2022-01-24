import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import {getCustomRepository} from "typeorm";
import CommentRepository from "../../libs/application/user/comment-repository";


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
    const {content} = req.query;
    await getCustomRepository(CommentRepository).patchComment(commentId,content);
    return res.send(`comment ${commentId}를 업데이트 : ${JSON.stringify(req.query)}`);
    //res.send();
});