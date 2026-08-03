import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { SystemFeatureGroupRule } from '~/modules/system-feature-group-rule/entities/system-feature-group-rule.entity';
import { BaseRepository } from '~/shared/repositories/base/base-repository';

type FindAllSystemFeatureGroupRuleParams = {
  ruleSetId?: number;
  groupId?: number;
};

@Injectable()
export class SystemFeatureGroupRuleRepository extends BaseRepository<SystemFeatureGroupRule> {
  constructor(entityManager?: EntityManager) {
    super(SystemFeatureGroupRule, entityManager);
  }

  async findById(id: number) {
    if (!id) {
      throw new InternalServerErrorException('Missing params: id.');
    }

    return this.repo.findOne({
      where: { id },
    });
  }

  async findAllByRuleSetIdAndGroupId({
    ruleSetId,
    groupId,
  }: FindAllSystemFeatureGroupRuleParams) {
    return this.repo.find({
      where: [
        {
          ...(ruleSetId !== undefined ? { ruleSetId } : {}),
          ...(groupId !== undefined ? { ruleSet: { groupId } } : {}),
        },
      ],
    });
  }
}
