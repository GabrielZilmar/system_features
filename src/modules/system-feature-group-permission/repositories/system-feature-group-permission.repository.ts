import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { SystemFeatureGroupPermission } from '~/modules/system-feature-group-permission/entities/system-feature-group-permission.entity';
import { BaseRepository } from '~/shared/repositories/base/base-repository';

@Injectable()
export class SystemFeatureGroupPermissionRepository extends BaseRepository<SystemFeatureGroupPermission> {
  constructor(entityManager?: EntityManager) {
    super(SystemFeatureGroupPermission, entityManager);
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
