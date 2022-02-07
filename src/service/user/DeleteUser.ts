import User from '../../entity/User';

class DeleteUser {
  async deleteUser(oauthid: string): Promise<string> {
     await User.delete({
        oauthId: oauthid
    });
    return ;
  }
}

export default new DeleteUser();
