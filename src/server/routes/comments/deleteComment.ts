import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import {getCustomRepository} from "typeorm";
import CommentRepository from "../../libs/application/user/comment-repository";


const schema = defineSchema({
    params: {
        commentId: z.string(),
    },
});

export default defineRoute('delete','/comment/:commentId?', schema, async (req, res) => {

    const {commentId} = req.params;
    await getCustomRepository(CommentRepository).deleteComment(commentId);
    return res.send(`comment ${commentId}를 삭제했습니다.`);
    //res.send();
});
