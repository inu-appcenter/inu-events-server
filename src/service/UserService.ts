import User from '../entity/User';

type ModifyUserParams = {
  nickname: string;
};

class UserService {
  async getUser(id: number): Promise<User> {
    return await User.findOneOrFail({where: {id}});
  }

  async patchUser(id: number, body: Partial<ModifyUserParams>): Promise<string> {
    const patchuser = await User.update(
      {id},
      body
    );
    return patchuser.raw;
  }

  async deleteUser(id: number): Promise<void> {
    await User.delete({id});
  }
}

export default new UserService();
