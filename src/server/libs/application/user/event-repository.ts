import { EntityRepository, Repository } from 'typeorm';
import User from '../../../../entity/User';
import Event from '../../../../entity/Event';
import {date, ZodDate, ZodNumber, ZodString} from "zod";
import {userInfo} from "os";

@EntityRepository(Event)
class EventRepository extends Repository<Event> {
    // 아악 몰라악!!!!!!!! 임시저장임
    async createEvent(user: { createdAt?: ZodDate["_output"]; oauthId?: ZodString["_output"]; nickname?: ZodString["_output"]; id?: ZodNumber["_output"]; email?: ZodString["_output"]; oauthProvider?: ZodString["_output"] },
                      host: string, category: string, title: string, body: string, imageUuid: string, startAt: Date, endAt: Date) {

        const event = await Event.createQueryBuilder().
                                    insert().into(Event).
                                    values({ user, host, category, title, body, imageUuid, startAt, endAt}).execute();
        return event.identifiers[0].id;

    }


}

export default EventRepository;