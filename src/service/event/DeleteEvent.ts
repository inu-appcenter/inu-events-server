import User from '../../entity/User';
import Event from '../../entity/Event';

class DeleteEvent {
    async deleteEvent(eventId: string): Promise<string> {
        const eventIdStr2Num = parseInt(eventId)
        await Event.delete({
            id: eventIdStr2Num
        });
        return ;
    }
}

export default new DeleteEvent();
