import User from '../../entity/User';

class DeleteUser {
  async deleteUser(oauthid: string): Promise<string> {
    const deluser = await User.delete({
        oauthId: oauthid
    });
    return deluser.raw;
  }
}

export default new DeleteUser();
