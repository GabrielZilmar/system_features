import { UserDto } from '~/modules/users/dto/user.dto';

export class SystemFeatureGroupMemberDto {
  groupId: number;
  userId: number;
  user?: UserDto;

  constructor(init: SystemFeatureGroupMemberDto) {
    Object.assign(this, init);
  }
}
