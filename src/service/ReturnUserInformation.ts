import {getGoogleOAuthInfo} from '../oauth';
import User from '../entity/User';

class ReturnUserInformation {
  async findUserByAccessToken(accessToken: string): Promise<User> {
    const userInfo = await getGoogleOAuthInfo(accessToken);
    return await User.findOne({where: {email: userInfo.email}});
  }
}

export default new ReturnUserInformation();
