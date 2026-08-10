import {
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { FeatureGuard } from './feature.guard';
import { GROUP_RULE_FIELDS } from '~/modules/system-feature-group-rule/constants';
import { SystemFeaturesAccessDynamicGroupRulesOperatorEnum } from '~/modules/system-feature-group-rule/entities/system-feature-group-rule.entity';
import { SYSTEM_FEATURE_KEYS } from '~/modules/system-features/constants';

const createContext = (userId?: string) =>
  ({
    getHandler: jest.fn(),
    switchToHttp: () => ({
      getRequest: () => ({
        headers: userId === undefined ? {} : { 'user-id': userId },
      }),
    }),
  }) as unknown as ExecutionContext;

describe('FeatureGuard', () => {
  const reflector = {
    get: jest.fn(),
  } as unknown as Reflector;

  const userRepository = {
    findById: jest.fn(),
  };

  const systemFeatureRepository = {
    findByKey: jest.fn(),
  };

  const systemFeatureAccessControlRepository = {
    findByFeatureIdWithGroupRelations: jest.fn(),
  };

  const guard = new FeatureGuard(
    reflector,
    userRepository as never,
    systemFeatureRepository as never,
    systemFeatureAccessControlRepository as never,
  );

  beforeEach(() => {
    jest.clearAllMocks();
    (reflector.get as jest.Mock).mockReturnValue(SYSTEM_FEATURE_KEYS.WALLET);
    (systemFeatureRepository.findByKey as jest.Mock).mockResolvedValue({
      id: 1,
      key: SYSTEM_FEATURE_KEYS.WALLET,
      isEnabled: true,
    });
  });

  it('throws when the user-id header is missing', async () => {
    await expect(guard.canActivate(createContext())).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });

  it('throws when a denied access-control matches, even if an allow matches too', async () => {
    (userRepository.findById as jest.Mock).mockResolvedValue({
      id: 10,
      name: 'Alice',
      address: { name: 'Lisbon' },
    });
    (
      systemFeatureAccessControlRepository.findByFeatureIdWithGroupRelations as jest.Mock
    ).mockResolvedValue([
      {
        isAllowed: true,
        group: {
          members: [{ userId: 10 }],
          sets: [],
        },
      },
      {
        isAllowed: false,
        group: {
          members: [{ userId: 10 }],
          sets: [],
        },
      },
    ]);

    await expect(guard.canActivate(createContext('10'))).rejects.toBeInstanceOf(
      ForbiddenException,
    );
  });

  it('allows access when a rule matches the user', async () => {
    (userRepository.findById as jest.Mock).mockResolvedValue({
      id: 10,
      name: 'Alice',
      address: { name: 'Lisbon' },
    });
    (
      systemFeatureAccessControlRepository.findByFeatureIdWithGroupRelations as jest.Mock
    ).mockResolvedValue([
      {
        isAllowed: true,
        group: {
          members: [],
          sets: [
            {
              rules: [
                {
                  field: GROUP_RULE_FIELDS.USER_NAME,
                  operator:
                    SystemFeaturesAccessDynamicGroupRulesOperatorEnum.IN,
                  comparisonValues: ['alice'],
                },
              ],
            },
          ],
        },
      },
    ]);

    await expect(guard.canActivate(createContext('10'))).resolves.toBe(true);
  });

  it('supports address rules even when the user has no address', async () => {
    (userRepository.findById as jest.Mock).mockResolvedValue({
      id: 10,
      name: 'Alice',
    });
    (
      systemFeatureAccessControlRepository.findByFeatureIdWithGroupRelations as jest.Mock
    ).mockResolvedValue([
      {
        isAllowed: true,
        group: {
          members: [],
          sets: [
            {
              rules: [
                {
                  field: GROUP_RULE_FIELDS.ADDRESS_NAME,
                  operator:
                    SystemFeaturesAccessDynamicGroupRulesOperatorEnum.NOT_IN,
                  comparisonValues: ['porto'],
                },
              ],
            },
          ],
        },
      },
    ]);

    await expect(guard.canActivate(createContext('10'))).resolves.toBe(true);
  });

  it('throws when the user does not match any allowed access-control', async () => {
    (userRepository.findById as jest.Mock).mockResolvedValue({
      id: 10,
      name: 'Alice',
      address: { name: 'Lisbon' },
    });
    (
      systemFeatureAccessControlRepository.findByFeatureIdWithGroupRelations as jest.Mock
    ).mockResolvedValue([
      {
        isAllowed: true,
        group: {
          members: [],
          sets: [],
        },
      },
    ]);

    await expect(guard.canActivate(createContext('10'))).rejects.toBeInstanceOf(
      ForbiddenException,
    );
  });

  it('throws when the user id header is not numeric', async () => {
    await expect(
      guard.canActivate(createContext('abc')),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('throws when the feature is disabled', async () => {
    (systemFeatureRepository.findByKey as jest.Mock).mockResolvedValue({
      id: 1,
      key: SYSTEM_FEATURE_KEYS.WALLET,
      isEnabled: false,
    });

    await expect(guard.canActivate(createContext('10'))).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
