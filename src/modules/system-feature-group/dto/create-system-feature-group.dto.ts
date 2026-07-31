import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSystemFeatureGroupDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
}
