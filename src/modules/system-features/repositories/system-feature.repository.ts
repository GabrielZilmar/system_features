import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { SystemFeatureKeys } from '~/modules/system-features/constants';
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

  async findByKey(key: SystemFeatureKeys) {
    if (!key) {
      throw new InternalServerErrorException('Missing params: key.');
    }

    return this.repo.findOne({
      where: { key },
    });
  }

  async findDetailsById(id: number) {
    if (!id) {
      throw new InternalServerErrorException('Missing params: id.');
    }

    return this.repo.findOne({
      where: { id },
      relations: {
        accessControls: {
          group: { members: { user: true }, sets: { rules: true } },
        },
      },
    });
  }
}
