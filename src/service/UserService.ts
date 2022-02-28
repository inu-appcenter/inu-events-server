import User from '../entity/User';
import {Infer} from '../common/utils/zod';
import {UpdateMeRequestScheme} from '../entity/schemes';

class UserService {
  async getUser(id: number): Promise<User> {
    return await User.findOneOrFail({where: {id}});
  }

  async patchUser(id: number, body: Partial<Infer<typeof UpdateMeRequestScheme>>): Promise<string> {
    const patchuser = await User.update(
      {id},
      body
    );
    return patchuser.raw;
  }

  async deleteUser(id: number): Promise<void> {
    const deleteDate = new Date();
    const deleteUser = await User.update(
      {id},
      {deletedAt: deleteDate}
    )
    return deleteUser.raw;
  }
}

export default new UserService();
