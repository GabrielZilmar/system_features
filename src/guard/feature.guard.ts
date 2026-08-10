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
import { SystemFeatureAccessControl } from '~/modules/system-feature-access-control/entities/system-feature-access-control.entity';
import { SystemFeatureAccessControlRepository } from '~/modules/system-feature-access-control/repositories/system-feature-access-control.repository';
import { GROUP_RULE_FIELDS } from '~/modules/system-feature-group-rule/constants';
import {
  SystemFeatureGroupRule,
  SystemFeaturesAccessDynamicGroupRulesOperatorEnum,
} from '~/modules/system-feature-group-rule/entities/system-feature-group-rule.entity';
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

  private normalizeComparisonValue(value?: string | null) {
    return value?.trim().toLowerCase();
  }

  private userMatchesGroupRule(rule: SystemFeatureGroupRule, user: User) {
    const normalizedUserName = this.normalizeComparisonValue(user.name);
    const normalizedAddressName = this.normalizeComparisonValue(
      user.address?.name,
    );

    switch (rule.field) {
      case GROUP_RULE_FIELDS.USER_NAME: {
        const hasName = rule.comparisonValues.some(
          (value) =>
            this.normalizeComparisonValue(value) === normalizedUserName,
        );

        return rule.operator ===
          SystemFeaturesAccessDynamicGroupRulesOperatorEnum.IN
          ? hasName
          : !hasName;
      }

      case GROUP_RULE_FIELDS.ADDRESS_NAME: {
        const hasAddress = rule.comparisonValues.some(
          (value) =>
            this.normalizeComparisonValue(value) === normalizedAddressName,
        );

        return rule.operator ===
          SystemFeaturesAccessDynamicGroupRulesOperatorEnum.IN
          ? hasAddress
          : !hasAddress;
      }

      default:
        return false;
    }
  }

  private userMatchesAccessControl(
    accessControl: SystemFeatureAccessControl,
    user: User,
  ) {
    const memberMatch = accessControl.group.members.some(
      (member) => member.userId === user.id,
    );
    if (memberMatch) {
      return true;
    }

    return accessControl.group.sets.some((set) => {
      if (!set.rules.length) {
        return false;
      }

      return set.rules.every((rule) => this.userMatchesGroupRule(rule, user));
    });
  }

  private async validateFeaturePermissions(feature: SystemFeature, user: User) {
    const accessControls =
      await this.systemFeatureAccessControlRepository.findByFeatureIdWithGroupRelations(
        feature.id,
      );
    if (!accessControls.length) {
      return;
    }

    const deniedAccessControl = accessControls.find(
      (accessControl) =>
        !accessControl.isAllowed &&
        this.userMatchesAccessControl(accessControl, user),
    );
    if (deniedAccessControl) {
      throw new ForbiddenException(
        'The user cannot access this feature because they match a denied access-control rule.',
      );
    }

    const allowedAccessControl = accessControls.some(
      (accessControl) =>
        accessControl.isAllowed &&
        this.userMatchesAccessControl(accessControl, user),
    );
    if (allowedAccessControl) {
      return;
    }

    throw new ForbiddenException(
      'The user cannot access this feature because they do not match any allowed access-control rule.',
    );
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
