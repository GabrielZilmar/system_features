import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from '~/modules/addresses/dto/create-address.dto';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address?: CreateAddressDto;
}
