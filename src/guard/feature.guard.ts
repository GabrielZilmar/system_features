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
import {
  SYSTEM_FEATURE_KEYS,
  SystemFeatureKeys,
} from '~/modules/system-features/constants';
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
    const userId = request.headers['user-id'];
    if (!userId || Array.isArray(userId)) {
      throw new UnauthorizedException("'user-id' header not provided");
    }

    const user = await this.userRepository.findById(Number(userId));
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  private async validateFeature(featureKey: SystemFeatureKeys) {
    const feature = await this.systemFeatureRepository.findByKey(featureKey);
    if (!feature.isEnabled) {
      throw new NotFoundException();
    }

    return feature;
  }

  private userIsAllowedAsGroupMember(
    accessControls: SystemFeatureAccessControl[],
    userId: number,
  ) {
    return accessControls.some((accessControl) => {
      const hasMember = accessControl.group.members.some(
        (member) => member.userId === userId,
      );

      if (hasMember && !accessControl.isAllowed) {
        throw new ForbiddenException(
          'The user cannot access this feature because they belong to a group that is denied access.',
        );
      }

      return hasMember;
    });
  }

  private useHasRuleAccess(rule: SystemFeatureGroupRule, user: User) {
    switch (rule.field) {
      case GROUP_RULE_FIELDS.USER_NAME:
        const hasName = rule.comparisonValues.some(
          (value) => value.toLowerCase() === user.name.toLowerCase(),
        );

        return rule.operator ===
          SystemFeaturesAccessDynamicGroupRulesOperatorEnum.IN
          ? hasName
          : !hasName;

      case GROUP_RULE_FIELDS.ADDRESS_NAME:
        const hasAddress = rule.comparisonValues.some(
          (value) => value.toLowerCase() === user.address?.name.toLowerCase(),
        );

        return rule.operator ===
          SystemFeaturesAccessDynamicGroupRulesOperatorEnum.IN
          ? hasAddress
          : !hasAddress;
    }
  }

  private userIsAllowedByRules(
    accessControls: SystemFeatureAccessControl[],
    user: User,
  ) {
    return accessControls.some((accessControl) => {
      const matchRule = accessControl.group.sets.some((set) => {
        if (!set.rules.length) {
          return false;
        }

        return set.rules.every((rule) => this.useHasRuleAccess(rule, user));
      });
      if (!accessControl.isAllowed && matchRule) {
        throw new ForbiddenException(
          'The user cannot access this feature because they belong to a group that has a rule with a denied access.',
        );
      }

      return matchRule;
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

    const isAllowedAsGroupMember = this.userIsAllowedAsGroupMember(
      accessControls,
      user.id,
    );
    if (isAllowedAsGroupMember) {
      console.info('User is a member of a allowed group');
      return;
    }

    const isAllowedByRules = this.userIsAllowedByRules(accessControls, user);
    if (!isAllowedByRules) {
      throw new ForbiddenException(
        'The user cannot access this feature because they does not match to any rule.',
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
