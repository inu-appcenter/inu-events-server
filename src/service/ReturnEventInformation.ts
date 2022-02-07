import {getGoogleOAuthInfo} from '../oauth';
import Unauthorized from '../common/errors/http/Unauthorized';
import Event from '../entity/Event';
import {createJwt} from '../common/utils/token';
import {printError, stringifyError} from '../common/utils/error';


class ReturnEventInformation {
  async returnEvent(id: string): Promise<Event> {
      const eventInfo = await Event.findOne({where: {id: id}});
      return eventInfo;
    }
};

export default new ReturnEventInformation();

