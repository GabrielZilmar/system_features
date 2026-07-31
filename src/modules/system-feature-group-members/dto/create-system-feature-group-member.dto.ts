import { IsInt, Min } from 'class-validator';

export class CreateSystemFeatureGroupMemberDto {
  @IsInt()
  @Min(1)
  groupId: number;

  @IsInt()
  @Min(1)
  userId: number;
}
