import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { SystemFeatureGroup } from '~/modules/system-feature-group/entities/system-feature-group.entity';
import { BaseRepository } from '~/shared/repositories/base/base-repository';

@Injectable()
export class SystemFeatureGroupRepository extends BaseRepository<SystemFeatureGroup> {
  constructor(entityManager?: EntityManager) {
    super(SystemFeatureGroup, entityManager);
  }

  async findById(id: number) {
    if (!id) {
      throw new InternalServerErrorException('Missing params: id.');
    }

    return this.repo.findOne({
      where: { id },
    });
  }

  async findByName(name: string) {
    if (!name) {
      throw new InternalServerErrorException('Missing params: name.');
    }

    return this.repo.findOne({
      where: { name },
    });
  }
}
