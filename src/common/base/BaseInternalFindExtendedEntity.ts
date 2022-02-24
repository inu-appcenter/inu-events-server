import assert from 'assert';
import {EntityId} from 'typeorm/repository/EntityId';
import {BaseEntity} from 'typeorm';
import {NoSuchResource} from '../errors/general';
import {FindConditions} from 'typeorm/find-options/FindConditions';
import {FindOneOptions} from 'typeorm/find-options/FindOneOptions';
import {FindManyOptions} from 'typeorm/find-options/FindManyOptions';
import {FindOptionsUtils} from 'typeorm/find-options/FindOptionsUtils';

/**
 * BaseInternalFindExtendedEntity 클래스는 find, findOne, findOneOrFail 메소드에 대해
 * BaseBetterEntity가 이루고자 하는 실제 구현을 제공합니다.
 *
 * 해당 구현체 메소드들은 BaseBetterEntity에 직접 배치하지 못 하였습니다.
 * 왜냐 하면 BaseBetterEntity의 메소드들은 첫째 인자로 this를 받는 탓에
 * 진짜 this에 접근하지 못하기 때문입니다.
 *
 * 대신 super에는 접근할 수 있기에, 이 클래스를 정의하여
 * BaseBetterEntity의 상위에 두었습니다.
 */
export default class BaseInternalFindExtendedEntity extends BaseEntity {
  static relations: string[] = [];

  protected static async findInternal<T extends BaseEntity>(optionsOrConditions?: FindManyOptions<T> | FindConditions<T>): Promise<T[]> {
    if (isFindManyOptions(optionsOrConditions)) {
      /** 첫번째 오버로드. */
      return await super.find<T>(this.generateOptionsFromExisting(optionsOrConditions));
    } else {
      /** 두번째 오버로드. */
      return await super.find<T>({where: optionsOrConditions, ...this.generateOptionsFromExisting()});
    }
  }

  protected static async findOneInternal<T extends BaseEntity>(first?: EntityId | FindOneOptions<T> | FindConditions<T>, second?: FindOneOptions<T>): Promise<T | undefined> {
    const firstParamIsUndefined = first == null;
    const firstParamIsId = isId(first);
    const firstParamIsFindOptions = isFindOneOptions(first);
    const firstParamIsFindConditions = isFindConditions(first);

    const secondParamsIsUndefined = second == null;
    const secondParamsIsFindOptions = isFindOneOptions(second);

    if ((firstParamIsUndefined || firstParamIsId) && (secondParamsIsUndefined || secondParamsIsFindOptions)) {
      /** 첫번째 오버로드. */
      return await super.findOne<T>(first, this.generateOptionsFromExisting());
    }

    if (firstParamIsFindOptions && secondParamsIsUndefined) {
      /** 두번째 오버로드. */
      return await super.findOne<T>(this.generateOptionsFromExisting(first));
    }

    if ((firstParamIsUndefined || firstParamIsFindConditions) && (secondParamsIsUndefined || secondParamsIsFindOptions)) {
      /** 세번째 오버로드. */
      return await super.findOne<T>(first, this.generateOptionsFromExisting(first));
    }

    throw Error('No matching overload found.');
  }

  protected static async findOneOrFailInternal<T extends BaseEntity>(first?: EntityId | FindOneOptions<T> | FindConditions<T>, second?: FindOneOptions<T>): Promise<T> {
    const result = await this.findOneInternal(first, second);

    assert(result, NoSuchResource());

    return result;
  }

  private static generateOptionsFromExisting(optionsLike?: any) {
    return {...(optionsLike || {}), relations: this.relations};
  }
}

function isFindManyOptions<Entity = any>(obj: any): obj is FindManyOptions<Entity> {
  return FindOptionsUtils.isFindManyOptions(obj);
}

function isFindOneOptions<Entity = any>(obj: any): obj is FindOneOptions<Entity> {
  return FindOptionsUtils.isFindOneOptions(obj);
}

function isFindConditions<Entity = any>(obj: any): obj is FindConditions<EntityId> {
  return obj instanceof Object && !isFindOneOptions(obj);
}

function isId(obj: any): obj is EntityId {
  return typeof obj === 'string' || typeof obj === 'number' || (obj as any) instanceof Date;
}
