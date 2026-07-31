import {
  DeepPartial,
  DeleteResult,
  FindOptionsWhere,
  ObjectLiteral,
} from 'typeorm';

export interface IWrite<TEntity extends ObjectLiteral> {
  save(data: DeepPartial<TEntity>): Promise<TEntity>;
  merge(entity: TEntity, data: DeepPartial<TEntity>): Promise<TEntity>;
  softDelete(
    criteria: number | Date | FindOptionsWhere<TEntity>,
  ): Promise<DeleteResult>;
  delete(
    criteria: number | Date | FindOptionsWhere<TEntity>,
  ): Promise<DeleteResult>;
}
