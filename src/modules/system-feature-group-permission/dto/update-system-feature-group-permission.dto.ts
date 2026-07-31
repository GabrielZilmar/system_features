import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateSystemFeatureGroupPermissionDto {
  @IsOptional()
  @IsBoolean()
  isAllowed?: boolean;
}
