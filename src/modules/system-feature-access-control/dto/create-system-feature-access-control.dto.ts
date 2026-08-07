import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator';

export class CreateSystemFeatureAccessControlDto {
  @IsInt()
  @Min(1)
  groupId: number;

  @IsInt()
  @Min(1)
  featureId: number;

  @IsOptional()
  @IsBoolean()
  isAllowed?: boolean;
}
