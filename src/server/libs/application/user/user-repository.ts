import { EntityRepository, Repository } from 'typeorm';
import User from '../../../../entity/User';

@EntityRepository(User)
class UserRepository extends Repository<User> {
    async checkEmail(email: string): Promise<boolean> {
      const user = await User.createQueryBuilder('user').where('user.email = :email', { email }).getOne();
      return !!user;
    }
  
    async createUser(email: string,nickname: string ,oauthProvider:string,oauthId:string): Promise<string> {
      const user = await User.createQueryBuilder().insert().into(User).values({ email,nickname,oauthProvider,oauthId}).execute();
      return user.identifiers[0].id;
    }
  

  }
  
  export default UserRepository;