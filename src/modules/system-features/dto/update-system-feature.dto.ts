import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateSystemFeatureDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  key?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  displayName?: string | null;

  @IsOptional()
  @IsString()
  description?: string | null;

  @IsOptional()
  @IsBoolean()
  isEnabled?: boolean;
}
