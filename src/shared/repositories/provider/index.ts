import { Provider } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { SystemFeatureGroupMemberRepository } from '~/modules/system-feature-group-members/repositories/system-feature-group-member.repository';
import { SystemFeatureAccessControlRepository } from '~/modules/system-feature-access-control/repositories/system-feature-access-control.repository';
import { SystemFeatureGroupRuleRepository } from '~/modules/system-feature-group-rule/repositories/system-feature-group-rule.repository';
import { SystemFeatureGroupRuleSetRepository } from '~/modules/system-feature-group-rule-set/repositories/system-feature-group-rule-set.repository';
import { SystemFeatureGroupRepository } from '~/modules/system-feature-group/repositories/system-feature-group.repository';
import { SystemFeatureRepository } from '~/modules/system-features/repositories/system-feature.repository';
import { AddressRepository } from '~/modules/addresses/repositories/address.repository';
import { UserRepository } from '~/modules/users/repositories/user.repository';

const repositoriesProviders: Provider[] = [
  EntityManager,
  SystemFeatureRepository,
  SystemFeatureGroupRepository,
  SystemFeatureAccessControlRepository,
  SystemFeatureGroupMemberRepository,
  SystemFeatureGroupRuleRepository,
  SystemFeatureGroupRuleSetRepository,
  AddressRepository,
  UserRepository,
];

export default repositoriesProviders;
