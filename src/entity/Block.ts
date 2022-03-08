import {CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import User from './User'
import {Infer} from '../common/utils/zod';
import {BlockResponseScheme} from './schemes';
import BaseBetterEntity from '../common/base/BaseBetterEntity';

@Entity()
export default class Block extends BaseBetterEntity {
  static relations = ['blockingUser', 'blockedUser'];

  @PrimaryGeneratedColumn({comment: '식별자.'})
  id: number

  @ManyToOne(() => User, (u) => u.blockedList)
  @JoinColumn()
  blockingUser: User;

  @ManyToOne(() => User)
  @JoinColumn()
  blockedUser: User;

  @CreateDateColumn({comment: '차단 일시.'})
  createdAt: Date;

  async toResponse(userId?: number): Promise<Infer<typeof BlockResponseScheme>> {
    return {
      user: this.blockedUser,
      blockedAt: this.createdAt
    }
  }
}
