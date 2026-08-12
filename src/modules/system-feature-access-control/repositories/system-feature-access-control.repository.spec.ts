import { SystemFeatureAccessControlRepository } from './system-feature-access-control.repository';

describe('SystemFeatureAccessControlRepository', () => {
  const qb = {
    innerJoin: jest.fn().mockReturnThis(),
    leftJoin: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    getMany: jest.fn(),
  };

  const repo = {
    createQueryBuilder: jest.fn(() => qb),
  };

  const entityManager = {
    connection: { isInitialized: true },
    getRepository: jest.fn(() => repo),
  } as never;

  const repository = new SystemFeatureAccessControlRepository(entityManager);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('builds a direct SQL query for matching access controls', async () => {
    qb.getMany.mockResolvedValue([]);

    await repository.findMatchingByFeatureIdAndUserId(7, 11);

    expect(repo.createQueryBuilder).toHaveBeenCalledWith('access_control');
    expect(qb.innerJoin).toHaveBeenCalled();
    expect(qb.leftJoin).toHaveBeenCalledWith('user.address', 'address');
    expect(qb.where).toHaveBeenCalledWith(
      'access_control.feature_id = :featureId',
      { featureId: 7 },
    );
    expect(qb.andWhere).toHaveBeenCalledWith(
      expect.stringContaining('EXISTS ('),
    );
    expect(qb.andWhere).toHaveBeenCalledWith(
      expect.stringContaining('system_feature_group_members'),
    );
    expect(qb.andWhere).toHaveBeenCalledWith(
      expect.stringContaining('system_feature_group_rule_sets'),
    );
    expect(qb.andWhere).toHaveBeenCalledWith(
      expect.stringContaining('string_to_array'),
    );
    expect(qb.getMany).toHaveBeenCalled();
  });
});
