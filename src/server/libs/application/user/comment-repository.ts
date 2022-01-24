import { EntityRepository, Repository } from 'typeorm';
import User from '../../../../entity/User';
import Event from '../../../../entity/Event';
import Comment from '../../../../entity/Comment';
import {date, ZodDate, ZodNumber, ZodString} from "zod";
import {userInfo} from "os";

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment> {
    // 일단 accessToken으로 email 받아옴
    async returnUser(email: string): Promise<User> {
        const user = await User.createQueryBuilder('user').where('user.email = :email', { email }).getOne();
        console.log(user);
        return user;
    }

    async returnEvent (id: string): Promise<Event> {
        const event = await Event.createQueryBuilder('event').where('event.id = :id', { id }).getOne();
        console.log(event);
        return event;
    }

    async createComment(user: User,event:Event, content: string) {

        const comment = await Comment.createQueryBuilder().
                                    insert().into(Comment).
                                    values({ user, event,content}).execute();
        return comment.identifiers[0].id;
    }

    async deleteComment(commentId:string): Promise<string> {
        const event = await Comment.createQueryBuilder().
                                delete().from(Comment).
                                where("id = :id", {id:commentId}).execute();
        return event.raw;
    }

    async patchComment(commentId:string,content:string): Promise<string> {
        const user = await Comment.createQueryBuilder().
                                update(Comment).
                                set({content:content}).
                                where("id = :id", {id:commentId}).execute();
        return user.raw;
    }
}

export default CommentRepository;