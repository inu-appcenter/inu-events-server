import { EntityRepository, Repository, SimpleConsoleLogger } from 'typeorm';
import User from '../../../../entity/User';

@EntityRepository(User)
class UserRepository extends Repository<User> {
    async checkEmail(email: string): Promise<User> {
      const user = await User.createQueryBuilder('user').where('user.email = :email', { email }).getOne();
      console.log(user);
      return user;
    }
  
    async createUser(email: string,nickname: string ,oauthProvider:string,oauthId:string): Promise<string> {
      const user = await User.createQueryBuilder().insert().into(User).values({ email,nickname,oauthProvider,oauthId}).execute();
      return user.identifiers[0].id;
    }

    async deleteUser(oauthId:string): Promise<string> {
        const user = await User.createQueryBuilder().
                                delete().from(User).
                                where("oauthId = :oauthId", {oauthId:oauthId}).execute();
        return user.raw;
    }

    async patchUser(oauthId:string, nickname:string): Promise<string> {
        const user = await User.createQueryBuilder().
                                update(User).
                                set({nickname: nickname}).
                                where("oauthId = :oauthId", {oauthId:oauthId}).execute();
        return user.raw;
    }


  }
  
  export default UserRepository;