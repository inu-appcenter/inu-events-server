import {EntityId} from 'typeorm/repository/EntityId';
import {ObjectType} from 'typeorm/common/ObjectType';
import {FindOneOptions} from 'typeorm/find-options/FindOneOptions';
import {FindConditions} from 'typeorm/find-options/FindConditions';
import {FindManyOptions} from 'typeorm/find-options/FindManyOptions';
import BaseInternalFindExtendedEntity from './BaseInternalFindExtendedEntity';

/**
 * BaseBetterEntity 클래스는 BaseEntity 클래스에 세 가지 기능을 추가합니다:
 *
 * 하나, 엔티티 클래스에서 릴레이션을 정의해 놓으면 (예시: static relations: string[] = [];)
 * find, findOne, findOneOrFail에서 find option에 자동으로 relations 필드가 설정됩니다.
 *
 * 둘, findOneOrFail에서 엔티티를 찾지 못해 예외가 발생하는 경우,
 * 기본 에러가 아닌 NoSuchResource 에러를 던집니다.
 *
 * 셋, 엔티티에 toString 메소드를 추가합니다.
 * 적절한 설명을 반환할 것입니다.
 */
export default class BaseBetterEntity extends BaseInternalFindExtendedEntity {
  static find<T extends BaseBetterEntity>(this: ObjectType<T>, options?: FindManyOptions<T>): Promise<T[]>;
  static find<T extends BaseBetterEntity>(this: ObjectType<T>, conditions?: FindConditions<T>): Promise<T[]>;
  static find<T extends BaseBetterEntity>(this: ObjectType<T>, optionsOrConditions?: FindManyOptions<T> | FindConditions<T>): Promise<T[]> {
    return super.findInternal(optionsOrConditions);
  }

  static findOne<T extends BaseBetterEntity>(this: ObjectType<T>, id?: EntityId, options?: FindOneOptions<T>): Promise<T | undefined>;
  static findOne<T extends BaseBetterEntity>(this: ObjectType<T>, options?: FindOneOptions<T>): Promise<T | undefined>;
  static findOne<T extends BaseBetterEntity>(this: ObjectType<T>, conditions?: FindConditions<T>, options?: FindOneOptions<T>): Promise<T | undefined>;
  static findOne<T extends BaseBetterEntity>(this: ObjectType<T>, idOrOptionsOrConditions?: EntityId | FindOneOptions<T> | FindConditions<T>, maybeOptions?: FindOneOptions<T>): Promise<T | undefined> {
    return super.findOneInternal(idOrOptionsOrConditions, maybeOptions);
  }

  static findOneOrFail<T extends BaseBetterEntity>(this: ObjectType<T>, id?: EntityId, options?: FindOneOptions<T>): Promise<T>;
  static findOneOrFail<T extends BaseBetterEntity>(this: ObjectType<T>, options?: FindOneOptions<T>): Promise<T>;
  static findOneOrFail<T extends BaseBetterEntity>(this: ObjectType<T>, conditions?: FindConditions<T>, options?: FindOneOptions<T>): Promise<T>;
  static findOneOrFail<T extends BaseBetterEntity>(this: ObjectType<T>, idOrOptionsOrConditions?: EntityId | FindOneOptions<T> | FindConditions<T>, maybeOptions?: FindOneOptions<T>): Promise<T> {
    return super.findOneOrFailInternal(idOrOptionsOrConditions, maybeOptions);
  }

  toString() {
    // @ts-ignore
    return `[id가 ${this.constructor.getId(this)}인 ${this.constructor.name}]`;
  }
}
