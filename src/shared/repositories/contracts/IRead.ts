import { FindManyOptions, FindOneOptions, ObjectLiteral } from 'typeorm';

export type FindAllPaginatedParams<TEntity> = {
  page: number;
  perPage: number;
  options?: FindManyOptions<TEntity>;
};

export interface IRead<TEntity extends ObjectLiteral> {
  findOne(options: FindOneOptions<TEntity>): Promise<TEntity | null>;
  findAll(options?: FindManyOptions<TEntity>): Promise<TEntity[]>;
  findById(
    id: number,
    options?: Omit<FindOneOptions<TEntity>, 'where'>,
  ): Promise<TEntity | null>;
  findAndCount(
    options?: FindManyOptions<TEntity>,
  ): Promise<[TEntity[], number]>;
  findAllPaginated(
    params: FindAllPaginatedParams<TEntity>,
  ): Promise<[TEntity[], number]>;
}
