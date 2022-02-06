import User from '../../entity/User';
class GetUser {
  async getUser(oauthId: string): Promise<User> {
    const getuser = await User.findOne({where: {oauthId: oauthId}});
    return getuser;
  }
}

export default new GetUser();
