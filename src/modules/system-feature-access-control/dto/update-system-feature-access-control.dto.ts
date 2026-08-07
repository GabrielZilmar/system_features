import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateSystemFeatureAccessControlDto {
  @IsOptional()
  @IsBoolean()
  isAllowed?: boolean;
}
