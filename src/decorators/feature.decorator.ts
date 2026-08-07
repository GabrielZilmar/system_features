import { Reflector } from '@nestjs/core';
import { SystemFeatureKeys } from '~/modules/system-features/constants';

export const Feature = Reflector.createDecorator<SystemFeatureKeys>();
