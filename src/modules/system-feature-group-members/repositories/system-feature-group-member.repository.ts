import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { SystemFeatureGroupMembers } from '~/modules/system-feature-group-members/entities/system-feature-group-member.entity';
import { BaseRepository } from '~/shared/repositories/base/base-repository';

@Injectable()
export class SystemFeatureGroupMemberRepository extends BaseRepository<SystemFeatureGroupMembers> {
  constructor(entityManager?: EntityManager) {
    super(SystemFeatureGroupMembers, entityManager);
  }

  async findByGroupIdAndUserId(groupId: number, userId: number) {
    if (!groupId) {
      throw new InternalServerErrorException('Missing params: groupId.');
    }

    if (!userId) {
      throw new InternalServerErrorException('Missing params: userId.');
    }

    return this.repo.findOne({
      where: { groupId, userId },
    });
  }

  async deleteByGroupIdAndUserId(groupId: number, userId: number) {
    if (!groupId) {
      throw new InternalServerErrorException('Missing params: groupId.');
    }

    if (!userId) {
      throw new InternalServerErrorException('Missing params: userId.');
    }

    return this.repo.delete({ groupId, userId });
  }
}
