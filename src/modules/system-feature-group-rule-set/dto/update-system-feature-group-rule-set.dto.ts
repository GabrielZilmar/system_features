import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateSystemFeatureGroupRuleSetDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;
}
