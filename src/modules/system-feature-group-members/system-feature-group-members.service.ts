import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSystemFeatureGroupMemberDto } from '~/modules/system-feature-group-members/dto/create-system-feature-group-member.dto';
import { SystemFeatureGroupMemberDto } from '~/modules/system-feature-group-members/dto/system-feature-group-member.dto';
import { SystemFeatureGroupMemberMapper } from '~/modules/system-feature-group-members/mappers/system-feature-group-member.mapper';
import { SystemFeatureGroupMemberRepository } from '~/modules/system-feature-group-members/repositories/system-feature-group-member.repository';
import { SystemFeatureGroupRepository } from '~/modules/system-feature-group/repositories/system-feature-group.repository';
import { UserRepository } from '~/modules/users/repositories/user.repository';

@Injectable()
export class SystemFeatureGroupMembersService {
  constructor(
    private readonly systemFeatureGroupMemberRepository: SystemFeatureGroupMemberRepository,
    private readonly systemFeatureGroupRepository: SystemFeatureGroupRepository,
    private readonly userRepository: UserRepository,
  ) {}

  private async validateGroupAndUserExist(
    groupId: number,
    userId: number,
  ): Promise<void> {
    const [group, user] = await Promise.all([
      this.systemFeatureGroupRepository.findById(groupId),
      this.userRepository.findById(userId),
    ]);

    if (!group) {
      throw new NotFoundException(
        `System feature group ${groupId} was not found`,
      );
    }

    if (!user) {
      throw new NotFoundException(`User ${userId} was not found`);
    }
  }

  async findAll(): Promise<SystemFeatureGroupMemberDto[]> {
    const members =
      await this.systemFeatureGroupMemberRepository.findAllWithUserRelations();
    members.sort((left, right) => {
      if (left.groupId !== right.groupId) {
        return left.groupId - right.groupId;
      }

      return left.userId - right.userId;
    });
    return members.map(SystemFeatureGroupMemberMapper.toDto);
  }

  async findOne(
    groupId: number,
    userId: number,
  ): Promise<SystemFeatureGroupMemberDto> {
    const member =
      await this.systemFeatureGroupMemberRepository.findByGroupIdAndUserId(
        groupId,
        userId,
      );

    if (!member) {
      throw new NotFoundException(
        `System feature group member ${groupId}:${userId} was not found`,
      );
    }

    return SystemFeatureGroupMemberMapper.toDto(member);
  }

  async create(
    createSystemFeatureGroupMemberDto: CreateSystemFeatureGroupMemberDto,
  ): Promise<SystemFeatureGroupMemberDto> {
    await this.validateGroupAndUserExist(
      createSystemFeatureGroupMemberDto.groupId,
      createSystemFeatureGroupMemberDto.userId,
    );

    const duplicatedMember =
      await this.systemFeatureGroupMemberRepository.findByGroupIdAndUserId(
        createSystemFeatureGroupMemberDto.groupId,
        createSystemFeatureGroupMemberDto.userId,
      );
    if (duplicatedMember) {
      throw new ConflictException(
        `System feature group member ${createSystemFeatureGroupMemberDto.groupId}:${createSystemFeatureGroupMemberDto.userId} already exists`,
      );
    }

    const member = SystemFeatureGroupMemberMapper.toEntity(
      createSystemFeatureGroupMemberDto,
    );

    const newMember =
      await this.systemFeatureGroupMemberRepository.save(member);

    return SystemFeatureGroupMemberMapper.toDto(newMember);
  }

  async remove(groupId: number, userId: number): Promise<void> {
    const member = await this.findOne(groupId, userId);

    if (!member) {
      throw new NotFoundException(
        `System feature group member ${groupId}:${userId} was not found`,
      );
    }

    await this.systemFeatureGroupMemberRepository.deleteByGroupIdAndUserId(
      groupId,
      userId,
    );
  }
}
