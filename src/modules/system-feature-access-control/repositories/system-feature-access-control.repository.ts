import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { SystemFeatureAccessControl } from '~/modules/system-feature-access-control/entities/system-feature-access-control.entity';
import { BaseRepository } from '~/shared/repositories/base/base-repository';

@Injectable()
export class SystemFeatureAccessControlRepository extends BaseRepository<SystemFeatureAccessControl> {
  constructor(entityManager?: EntityManager) {
    super(SystemFeatureAccessControl, entityManager);
  }

  async findByGroupIdAndFeatureId(groupId: number, featureId: number) {
    if (!groupId) {
      throw new InternalServerErrorException('Missing params: groupId.');
    }

    if (!featureId) {
      throw new InternalServerErrorException('Missing params: featureId.');
    }

    return this.repo.findOne({
      where: { groupId, featureId },
    });
  }

  async deleteByGroupIdAndFeatureId(groupId: number, featureId: number) {
    if (!groupId) {
      throw new InternalServerErrorException('Missing params: groupId.');
    }

    if (!featureId) {
      throw new InternalServerErrorException('Missing params: featureId.');
    }

    return this.repo.delete({ groupId, featureId });
  }

  async findByFeatureIdWithGroupRelations(featureId: number) {
    if (!featureId) {
      throw new InternalServerErrorException('Missing params: featureId.');
    }

    return this.repo.find({
      where: { featureId },
      relations: { group: { members: true, sets: { rules: true } } },
    });
  }
}
