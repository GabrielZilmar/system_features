import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CreateSystemFeatureGroupRuleSetDto {
  @IsInt()
  @Min(1)
  groupId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
}
