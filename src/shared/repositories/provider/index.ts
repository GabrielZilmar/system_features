import { Provider } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { SystemFeatureGroupMemberRepository } from '~/modules/system-feature-group-members/repositories/system-feature-group-member.repository';
import { SystemFeatureGroupPermissionRepository } from '~/modules/system-feature-group-permission/repositories/system-feature-group-permission.repository';
import { SystemFeatureGroupRuleSetRepository } from '~/modules/system-feature-group-rule-set/repositories/system-feature-group-rule-set.repository';
import { SystemFeatureGroupRepository } from '~/modules/system-feature-group/repositories/system-feature-group.repository';
import { SystemFeatureRepository } from '~/modules/system-features/repositories/system-feature.repository';
import { UserRepository } from '~/modules/users/repositories/user.repository';

const repositoriesProviders: Provider[] = [
  EntityManager,
  SystemFeatureRepository,
  SystemFeatureGroupRepository,
  SystemFeatureGroupPermissionRepository,
  SystemFeatureGroupMemberRepository,
  SystemFeatureGroupRuleSetRepository,
  UserRepository,
];

export default repositoriesProviders;
