import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { SystemFeatureGroupRuleSet } from '~/modules/system-feature-group-rule-set/entities/system-feature-group-rule-set.entity';
import { BaseRepository } from '~/shared/repositories/base/base-repository';

@Injectable()
export class SystemFeatureGroupRuleSetRepository extends BaseRepository<SystemFeatureGroupRuleSet> {
  constructor(entityManager?: EntityManager) {
    super(SystemFeatureGroupRuleSet, entityManager);
  }

  async findById(id: number) {
    if (!id) {
      throw new InternalServerErrorException('Missing params: id.');
    }

    return this.repo.findOne({
      where: { id },
    });
  }

  async findByGroupIdAndName(groupId: number, name: string) {
    if (!groupId) {
      throw new InternalServerErrorException('Missing params: groupId.');
    }

    if (!name) {
      throw new InternalServerErrorException('Missing params: name.');
    }

    return this.repo.findOne({
      where: { groupId, name },
    });
  }
}
