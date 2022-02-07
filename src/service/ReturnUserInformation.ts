import {getGoogleOAuthInfo} from '../oauth';
import User from '../entity/User';


class ReturnUserInformation {
  async returnUser(email: string): Promise<User> {
    const userInfo = await getGoogleOAuthInfo(email);
    const existingUser = await User.findOne({where: {email: userInfo.email}});
    return existingUser;
  }
};

export default new ReturnUserInformation();
