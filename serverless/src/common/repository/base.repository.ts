import { plainToClass } from 'class-transformer';
import {
  DeepPartial,
  FindManyOptions,
  ILike,
  ObjectLiteral,
  Repository,
  FindOptionsWhere,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { NotFoundException } from 'src/exception/not-found.exception';
import { Pagination } from 'src/paginate';
import { PaginationInfoInterface } from 'src/paginate/pagination-info.interface';
import { SearchFilterInterface } from 'src/common/interfaces/search-filter.interface';
import { ModelSerializer } from 'src/common/serializer/model.serializer';

/**
 * Base Repository for code reuse
 */
export class BaseRepository<
  T extends ObjectLiteral,
  K extends ModelSerializer,
> extends Repository<T> {
  /***
   * get entity by id
   * @param id
   * @param relations
   * @param transformOptions
   */
  async get(
    id: any,
    relations: string[] = [],
    transformOptions = {},
  ): Promise<K | null> {
    return await this.findOne({
      where: { id: id } as FindOptionsWhere<T>,
      relations,
    })
      .then((entity) => {
        if (!entity) {
          return Promise.reject(new NotFoundException());
        }
        return Promise.resolve(
          entity ? this.transform(entity, transformOptions) : null,
        );
      })
      .catch((error) => Promise.reject(error));
  }

  /**
   * find by condition
   * @param where
   * @param relations
   * @param transformOptions
   */
  async findBy(
    where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    relations: string[] = [],
    transformOptions: {} = {},
  ): Promise<T[]> {
    return this.find({
      where,
      relations,
    }) as Promise<T[]>; // Type assertion added here
  }

  /**
   * get count of entity by condition
   * @param conditions
   */
  async countEntityByCondition(
    conditions: FindOptionsWhere<T> = {},
  ): Promise<number> {
    return this.count({
      where: conditions,
    })
      .then((count) => {
        return Promise.resolve(count);
      })
      .catch((error) => Promise.reject(error));
  }

  /**
   * get all entity with filters
   * @param searchFilter
   * @param relations
   * @param searchCriteria
   * @param transformOptions
   */
  async findAll(
    searchFilter: DeepPartial<SearchFilterInterface>,
    relations: string[] = [],
    searchCriteria: (keyof T)[],
    transformOptions = {},
  ): Promise<K[]> {
    const whereCondition: FindOptionsWhere<T>[] = [];
    if (searchFilter.hasOwnProperty('keywords') && searchFilter.keywords) {
      for (const key of searchCriteria) {
        whereCondition.push({
          [key]: ILike(`%${searchFilter.keywords}%`),
        } as FindOptionsWhere<T>);
      }
    }
    const results = await this.find({
      where: whereCondition,
      relations,
    });
    return this.transformMany(results, transformOptions);
  }

  /**
   * Get pagination Skip & limit
   * @param options
   */
  getPaginationInfo(options): PaginationInfoInterface {
    const page =
      typeof options.page !== 'undefined' && options.page > 0
        ? options.page
        : 1;
    const limit =
      typeof options.limit !== 'undefined' && options.limit > 0
        ? options.limit
        : 10;
    return {
      skip: (page - 1) * limit,
      limit,
      page,
    };
  }

  /**
   * Paginate data
   * @param searchFilter
   * @param relations
   * @param searchCriteria
   * @param transformOptions
   */
  async paginate(
    searchFilter: DeepPartial<SearchFilterInterface>,
    relations: string[] = [],
    searchCriteria: (keyof T)[] = [],
    transformOptions = {},
  ): Promise<Pagination<K>> {
    const whereCondition: FindOptionsWhere<T>[] = [];
    const findOptions: FindManyOptions<T> = {};
    if (searchFilter.hasOwnProperty('keywords') && searchFilter.keywords) {
      for (const key of searchCriteria) {
        whereCondition.push({
          [key]: ILike(`%${searchFilter.keywords}%`),
        } as FindOptionsWhere<T>);
      }
    }
    const paginationInfo: PaginationInfoInterface =
      this.getPaginationInfo(searchFilter);
    findOptions.relations = relations;
    findOptions.take = paginationInfo.limit;
    findOptions.skip = paginationInfo.skip;
    findOptions.where = whereCondition;
    findOptions.order = {
      created_ad: 'DESC',
    } as any;
    const { page, skip, limit } = paginationInfo;
    const [results, total] = await this.findAndCount(findOptions);
    const serializedResult = this.transformMany(results, transformOptions);
    return new Pagination<K>({
      results: serializedResult,
      totalItems: total,
      pageSize: limit,
      currentPage: page,
      previous: page > 1 ? page - 1 : 0,
      next: total > skip + limit ? page + 1 : 0,
    });
  }

  /**
   * create new entity
   * @param inputs
   * @param relations
   */
  async createEntity(
    inputs: DeepPartial<T>,
    relations: string[] = [],
  ): Promise<K> {
    return this.save(inputs)
      .then(async (entity) => await this.get((entity as any).id, relations))
      .catch((error) => Promise.reject(error));
  }

  /**
   * update existing entity by id
   * @param entity
   * @param inputs
   * @param relations
   */
  async updateEntity(
    entity: K,
    inputs: QueryDeepPartialEntity<T>,
    relations: string[] = [],
  ): Promise<K> {
    return this.update(entity.id, inputs)
      .then(async () => await this.get(entity.id, relations))
      .catch((error) => Promise.reject(error));
  }

  /**
   * transform entity
   * @param model
   * @param transformOptions
   */
  transform(model: T, transformOptions = {}): K {
    return plainToClass(ModelSerializer, model, transformOptions) as K;
  }

  /**
   * transform array of entity
   * @param models
   * @param transformOptions
   */
  transformMany(models: T[], transformOptions = {}): K[] {
    return models.map((model) => this.transform(model, transformOptions));
  }
}
