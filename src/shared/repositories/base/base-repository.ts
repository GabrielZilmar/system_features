import {
  DeepPartial,
  DeleteResult,
  EntityManager,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { AppDataSource } from '~/modules/database/config/data-source';
import {
  FindAllPaginatedParams,
  IRead,
} from '~/shared/repositories/contracts/IRead';
import { IWrite } from '~/shared/repositories/contracts/IWrite';

export abstract class BaseRepository<TEntity extends ObjectLiteral>
  implements IRead<TEntity>, IWrite<TEntity>
{
  protected readonly repo: Repository<TEntity>;
  protected readonly manager: EntityManager;

  constructor(entity: EntityTarget<TEntity>, entityManager?: EntityManager) {
    this.manager = entityManager?.connection?.isInitialized
      ? entityManager
      : AppDataSource.manager;
    this.repo = this.manager.getRepository(entity);
  }

  async findOne(options: FindOneOptions<TEntity>): Promise<TEntity | null> {
    return this.repo.findOne(options);
  }

  async findOneOrFail(options: FindOneOptions<TEntity>): Promise<TEntity> {
    return this.repo.findOneOrFail(options);
  }

  async findAll(options?: FindManyOptions<TEntity>): Promise<TEntity[]> {
    return this.repo.find(options);
  }

  async findAllPaginated({
    page,
    perPage,
    options,
  }: FindAllPaginatedParams<TEntity>): Promise<[TEntity[], number]> {
    return this.findAndCount({
      ...options,
      skip: (page - 1) * perPage,
      take: perPage,
    });
  }

  async findAndCount(
    options?: FindManyOptions<TEntity>,
  ): Promise<[TEntity[], number]> {
    return this.repo.findAndCount(options);
  }

  async findById(
    id: number,
    options?: Omit<FindOneOptions<TEntity>, 'where'>,
  ): Promise<TEntity | null> {
    const where = { id } as unknown as FindOptionsWhere<TEntity>;
    return this.repo.findOne({
      ...(options ?? {}),
      where,
    });
  }

  async save(data: DeepPartial<TEntity>): Promise<TEntity> {
    return this.repo.save(this.repo.create(data));
  }

  async merge(entity: TEntity, data: DeepPartial<TEntity>): Promise<TEntity> {
    return this.repo.save(this.repo.merge(entity, data));
  }

  async softDelete(
    criteria: number | Date | FindOptionsWhere<TEntity>,
  ): Promise<DeleteResult> {
    return this.repo.softDelete(criteria);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.repo.delete(id);
  }

  protected async transaction<T>(
    callback: (manager: EntityManager) => Promise<T>,
  ): Promise<T> {
    if (this.manager.queryRunner?.isTransactionActive) {
      return callback(this.manager);
    }

    return AppDataSource.transaction(callback);
  }
}
