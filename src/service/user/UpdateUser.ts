import User from '../../entity/User';

class UpdateUser {
  async patchUser(oauthId:string, req_query:Object): Promise<string> {
    const patchuser = await User.update(
        {
            oauthId : oauthId
        },
            req_query
        );
    return patchuser.raw;
  }
}

export default new UpdateUser();
