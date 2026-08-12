import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Feature } from '~/decorators/feature.decorator';
import { SystemFeatureAccessControlRepository } from '~/modules/system-feature-access-control/repositories/system-feature-access-control.repository';
import { SystemFeatureKeys } from '~/modules/system-features/constants';
import { SystemFeature } from '~/modules/system-features/entities/system-features.entity';
import { SystemFeatureRepository } from '~/modules/system-features/repositories/system-feature.repository';
import { User } from '~/modules/users/entities/user.entity';
import { UserRepository } from '~/modules/users/repositories/user.repository';

@Injectable()
export class FeatureGuard {
  constructor(
    private readonly reflector: Reflector,
    private readonly userRepository: UserRepository,
    private readonly systemFeatureRepository: SystemFeatureRepository,
    private readonly systemFeatureAccessControlRepository: SystemFeatureAccessControlRepository,
  ) {}

  private async resolveUserFromRequest(request: Request) {
    const userIdHeader = request.headers['user-id'];
    if (!userIdHeader || Array.isArray(userIdHeader)) {
      throw new UnauthorizedException("'user-id' header not provided");
    }

    const userId = Number(userIdHeader);
    if (!Number.isInteger(userId) || userId <= 0) {
      throw new UnauthorizedException("'user-id' header is invalid");
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  private async validateFeature(featureKey: SystemFeatureKeys) {
    const feature = await this.systemFeatureRepository.findByKey(featureKey);
    if (!feature || !feature.isEnabled) {
      throw new NotFoundException();
    }

    return feature;
  }

  private async validateFeaturePermissions(feature: SystemFeature, user: User) {
    const accessControls =
      await this.systemFeatureAccessControlRepository.findMatchingByFeatureIdAndUserId(
        feature.id,
        user.id,
      );
    if (!accessControls.length) {
      throw new ForbiddenException(
        'The user cannot access this feature because they do not match any allowed access-control rule.',
      );
    }

    const deniedAccessControl = accessControls.find(
      (accessControl) => !accessControl.isAllowed,
    );
    if (deniedAccessControl) {
      throw new ForbiddenException(
        'The user cannot access this feature because they match a denied access-control rule.',
      );
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const featureKey = this.reflector.get<SystemFeatureKeys>(
      Feature,
      context.getHandler(),
    );
    if (!featureKey) {
      return true;
    }

    const feature = await this.validateFeature(featureKey);

    const user = await this.resolveUserFromRequest(
      context.switchToHttp().getRequest<Request>(),
    );
    await this.validateFeaturePermissions(feature, user);

    return true;
  }
}
