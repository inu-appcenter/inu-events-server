import Comment from '../../entity/Comment';

class DeleteComment {
    async deleteComment(commentId:string): Promise<string> {
        const coomentIdStr2Num = parseInt(commentId)
        await Comment.delete({
            id: coomentIdStr2Num
        });
        return ;
    }
}

export default new DeleteComment();

