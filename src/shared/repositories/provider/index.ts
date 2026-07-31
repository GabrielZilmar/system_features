import { Provider } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { SystemFeatureRepository } from '~/modules/system-features/repositories/system-feature.repository';

const repositoriesProviders: Provider[] = [
  EntityManager,
  SystemFeatureRepository,
];

export default repositoriesProviders;
