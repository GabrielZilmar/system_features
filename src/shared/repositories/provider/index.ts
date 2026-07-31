import { Provider } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { SystemFeatureGroupRepository } from '~/modules/system-feature-group/repositories/system-feature-group.repository';
import { SystemFeatureRepository } from '~/modules/system-features/repositories/system-feature.repository';

const repositoriesProviders: Provider[] = [
  EntityManager,
  SystemFeatureRepository,
  SystemFeatureGroupRepository,
];

export default repositoriesProviders;
