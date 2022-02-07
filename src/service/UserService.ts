import User from '../entity/User';

class UserService {
  async getUser(id: number): Promise<User> {
    return await User.findOne({where: {id}});
  }

  async patchUser(id: number, req_query: Object): Promise<string> {
    const patchuser = await User.update(
      {id},
      req_query
    );
    return patchuser.raw;
  }

  async deleteUser(id: number): Promise<void> {
    await User.delete({id});
  }
}

export default new UserService();
