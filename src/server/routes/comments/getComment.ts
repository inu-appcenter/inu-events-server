import {defineSchema} from '../../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../../libs/route';
import {getCustomRepository} from "typeorm";
import CommentRepository from "../../libs/application/comments/comment-repository";


const schema = defineSchema({
    params: {
        commentId: z.string(),
    },
});

export default defineRoute('get', '/comment/:commentId?', schema, async (req, res) => {

    const {commentId} = req.params;
    const Comment_Information = await getCustomRepository(CommentRepository).getComment(commentId);
    console.log(Comment_Information)
    // res.send(`comment ${commentId}의 id : ${Comment_Information.id} , content : ${Comment_Information.content} , createdAt : ${Comment_Information.createdAt}
    //                 comment를 단 사용자 id :${Comment_Information.user.id} , email : ${Comment_Information.user.email} , nickname :${Comment_Information.user.nickname} , oauthProvider : ${Comment_Information.user.oauthProvider} , createAt :${Comment_Information.user.createdAt}
    //                 comment가 달린 event id: ${Comment_Information.event.id} , host : ${Comment_Information.event.host} , category : ${Comment_Information.event.category} , ${Comment_Information.event.title} , body :${Comment_Information.event.body} , imageUuid: ${Comment_Information.event.imageUuid} , startAt : ${Comment_Information.event.startAt} , endAt : ${Comment_Information.event.endAt} , createAt : ${Comment_Information.event.createdAt}`);

    return res.json(Comment_Information)
});