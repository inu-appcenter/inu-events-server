import {defineSchema} from '../../libs/schema';
import {defineRoute} from '../../libs/route';
import EventService from '../../../service/EventService';
import {EventResponseScheme} from '../../../entity/schemes';

const schema = defineSchema({
    summary: '현재 진행중인 행사만 가져옵니다.',
    description: '마감인 행사는 보여주지 않고, 진행중인 행사만 내려줍니다., 이벤트 id 역순으로',

    response: [EventResponseScheme]
});

export default defineRoute('get', '/events-ongoing', schema, async (req, res) => {
    const {userId} = req;

    const eventInformation = await EventService.getEventsOnGoing(userId);

    return res.json(await Promise.all(eventInformation.map(e => e.toResponse(userId))));
});
