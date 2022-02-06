import {getGoogleOAuthInfo} from '../oauth';
import Unauthorized from '../common/errors/http/Unauthorized';
import User from '../entity/User';
import {createJwt} from '../common/utils/token';
import {printError, stringifyError} from '../common/utils/error';


class ReturnUserInformation {
  async returnUser(email: string): Promise<User> {
      const userInfo = await getGoogleOAuthInfo(email);
      const existingUser = await User.findOne({where: {email: userInfo.email}});
      return existingUser;
    }
};

export default new ReturnUserInformation();