import User from '../../entity/User';
import Event from '../../entity/Event';
import Comment from "../../entity/Comment";
import {JoinOptions} from "typeorm/find-options/JoinOptions";
import {number} from "zod";



class GetEvent {
    async getEvent(eventId: string): Promise<Event> {
        const eventIdStr2Num = parseInt(eventId)
        const getEvent = await Event.findOne({where: {id: eventIdStr2Num}});
        return getEvent;
    }
}

export default new GetEvent();


// 조인 옵션 내일 할게용
// join?: JoinOptions;
//
// innerJoinAndSelect?: {
//     [key: string]: string;
// };