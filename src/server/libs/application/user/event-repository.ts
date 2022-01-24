import { EntityRepository, Repository } from 'typeorm';
import User from '../../../../entity/User';
import Event from '../../../../entity/Event';
import {date, ZodDate, ZodNumber, ZodString} from "zod";
import {userInfo} from "os";

@EntityRepository(Event)
class EventRepository extends Repository<Event> {
    // 일단 accessToken으로 email 받아옴
    async returnUser(email: string): Promise<User> {
        const user = await User.createQueryBuilder('user').where('user.email = :email', { email }).getOne();
        console.log(user);
        return user;
    }
    async createEvent(user: User,host: string, category: string, title: string, body: string, imageUuid: string, startAt: Date, endAt: Date) {

        const event = await Event.createQueryBuilder().
                                    insert().into(Event).
                                    values({ user, host, category, title, body, imageUuid, startAt, endAt}).execute();
        return event.identifiers[0].id;

    }

    async deleteEvent(EventId:string): Promise<string> {
        const event = await Event.createQueryBuilder().
                                delete().from(Event).
                                where("id = :id", {id:EventId}).execute();
        return event.raw;
    }

    async patchEvent(eventId:string,host:string,category:string,title:string,body:string,imageUuid:string,startAt:Date,endAt:Date): Promise<string> {
        const user = await Event.createQueryBuilder().
                                update(Event).
                                set({host:host,category:category,title:title,body:body,imageUuid:imageUuid,startAt:startAt,endAt:endAt}).
                                where("id = :id", {id:eventId}).execute();
        return user.raw;
    }
}

export default EventRepository;