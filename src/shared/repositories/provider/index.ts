import { Provider } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { SystemFeatureGroupPermissionRepository } from '~/modules/system-feature-group-permission/repositories/system-feature-group-permission.repository';
import { SystemFeatureGroupRepository } from '~/modules/system-feature-group/repositories/system-feature-group.repository';
import { SystemFeatureRepository } from '~/modules/system-features/repositories/system-feature.repository';
import { UserRepository } from '~/modules/users/repositories/user.repository';

const repositoriesProviders: Provider[] = [
  EntityManager,
  SystemFeatureRepository,
  SystemFeatureGroupRepository,
  SystemFeatureGroupPermissionRepository,
  UserRepository,
];

export default repositoriesProviders;
