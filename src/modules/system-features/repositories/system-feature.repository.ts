import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { SystemFeature } from '~/modules/system-features/entities/system-features.entity';
import { BaseRepository } from '~/shared/repositories/base/base-repository';

@Injectable()
export class SystemFeatureRepository extends BaseRepository<SystemFeature> {
  constructor(entityManager?: EntityManager) {
    super(SystemFeature, entityManager);
  }

  async findById(id: number) {
    if (!id) {
      throw new InternalServerErrorException('Missing params: id.');
    }

    return this.repo.findOne({
      where: { id },
    });
  }

  async findByKey(key: string) {
    return this.repo.findOne({
      where: { key },
    });
  }
}
