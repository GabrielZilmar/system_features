import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { SystemFeatureAccessControl } from '~/modules/system-feature-access-control/entities/system-feature-access-control.entity';
import { GROUP_RULE_FIELDS } from '~/modules/system-feature-group-rule/constants';
import { BaseRepository } from '~/shared/repositories/base/base-repository';
import { User } from '~/modules/users/entities/user.entity';
import { SystemFeaturesAccessDynamicGroupRulesOperatorEnum } from '~/modules/system-feature-group-rule/entities/system-feature-group-rule.entity';

@Injectable()
export class SystemFeatureAccessControlRepository extends BaseRepository<SystemFeatureAccessControl> {
  constructor(entityManager?: EntityManager) {
    super(SystemFeatureAccessControl, entityManager);
  }

  private buildComparisonExistsSql(
    ruleAlias: string,
    normalizedValueSql: string,
  ) {
    return `EXISTS (
      SELECT 1
      FROM unnest(string_to_array(NULLIF(${ruleAlias}.comparison_values, ''), ',')) AS comparison_value(value)
      WHERE lower(trim(comparison_value.value)) = ${normalizedValueSql}
    )`;
  }

  private buildRuleMatchSql() {
    const ruleAlias = 'rule';
    const userAlias = 'user';
    const addressAlias = 'address';

    const normalizedUserNameSql = `lower(trim(coalesce(${userAlias}.name, '')))`;
    const normalizedAddressNameSql = `lower(trim(coalesce(${addressAlias}.name, '')))`;

    const userNameComparisonExistsSql = this.buildComparisonExistsSql(
      ruleAlias,
      normalizedUserNameSql,
    );
    const addressNameComparisonExistsSql = this.buildComparisonExistsSql(
      ruleAlias,
      normalizedAddressNameSql,
    );

    return `(
      (${ruleAlias}.field = '${GROUP_RULE_FIELDS.USER_NAME}' AND (
        (${ruleAlias}.operator = '${SystemFeaturesAccessDynamicGroupRulesOperatorEnum.IN}' AND ${userNameComparisonExistsSql})
        OR (${ruleAlias}.operator = '${SystemFeaturesAccessDynamicGroupRulesOperatorEnum.NOT_IN}' AND NOT ${userNameComparisonExistsSql})
      ))
      OR
      (${ruleAlias}.field = '${GROUP_RULE_FIELDS.ADDRESS_NAME}' AND (
        (${ruleAlias}.operator = '${SystemFeaturesAccessDynamicGroupRulesOperatorEnum.IN}' AND ${addressNameComparisonExistsSql})
        OR (${ruleAlias}.operator = '${SystemFeaturesAccessDynamicGroupRulesOperatorEnum.NOT_IN}' AND NOT ${addressNameComparisonExistsSql})
      ))
    )`;
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

  async findMatchingByFeatureIdAndUserId(featureId: number, userId: number) {
    if (!featureId) {
      throw new InternalServerErrorException('Missing params: featureId.');
    }

    if (!userId) {
      throw new InternalServerErrorException('Missing params: userId.');
    }

    const ruleMatchSql = this.buildRuleMatchSql();
    const memberMatchSql = `EXISTS (
      SELECT 1
      FROM system_feature_group_members member
      WHERE member.group_id = access_control.group_id
        AND member.user_id = :userId
    )`;
    const ruleSetMatchSql = `EXISTS (
      SELECT 1
      FROM system_feature_group_rule_sets rule_set
      WHERE rule_set.group_id = access_control.group_id
        AND EXISTS (
          SELECT 1
          FROM system_feature_group_rules rule
          WHERE rule.rule_set_id = rule_set.id
        )
        AND NOT EXISTS (
          SELECT 1
          FROM system_feature_group_rules rule
          WHERE rule.rule_set_id = rule_set.id
            AND NOT ${ruleMatchSql}
        )
    )`;

    return this.repo
      .createQueryBuilder('access_control')
      .innerJoin(User, 'user', 'user.id = :userId', { userId })
      .leftJoin('user.address', 'address')
      .where('access_control.feature_id = :featureId', { featureId })
      .andWhere(`(${memberMatchSql} OR ${ruleSetMatchSql})`)
      .getMany();
  }
}
