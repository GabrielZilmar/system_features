import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  SYSTEM_FEATURE_KEYS,
  SystemFeatureKeys,
} from '~/modules/system-features/constants';

export class UpdateSystemFeatureDto {
  @IsOptional()
  @IsString()
  @IsIn(Object.values(SYSTEM_FEATURE_KEYS))
  @MaxLength(100)
  key?: SystemFeatureKeys;

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
