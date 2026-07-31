import { AddressDto } from '~/modules/addresses/dto/address.dto';

export class UserDto {
  id: number;

  name: string;

  address?: AddressDto;

  constructor(init: UserDto) {
    Object.assign(this, init);
  }
}
