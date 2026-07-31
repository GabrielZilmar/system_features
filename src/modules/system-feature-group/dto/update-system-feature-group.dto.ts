import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateSystemFeatureGroupDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;
}
