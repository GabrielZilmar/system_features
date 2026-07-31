import { CreateSystemFeatureGroupMemberDto } from '~/modules/system-feature-group-members/dto/create-system-feature-group-member.dto';
import { SystemFeatureGroupMemberDto } from '~/modules/system-feature-group-members/dto/system-feature-group-member.dto';
import { SystemFeatureGroupMembers } from '~/modules/system-feature-group-members/entities/system-feature-group-member.entity';

export class SystemFeatureGroupMemberMapper {
  static toDto(member: SystemFeatureGroupMembers): SystemFeatureGroupMemberDto {
    return new SystemFeatureGroupMemberDto({
      groupId: member.groupId,
      userId: member.userId,
    });
  }

  static toEntity(
    memberDto: CreateSystemFeatureGroupMemberDto,
    member = new SystemFeatureGroupMembers(),
  ): SystemFeatureGroupMembers {
    member.groupId = memberDto.groupId;
    member.userId = memberDto.userId;

    return member;
  }
}
