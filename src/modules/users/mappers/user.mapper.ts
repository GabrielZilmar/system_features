import { CreateUserDto } from '~/modules/users/dto/create-user.dto';
import { UpdateUserDto } from '~/modules/users/dto/update-user.dto';
import { UserDto } from '~/modules/users/dto/user.dto';
import { AddressDto } from '~/modules/addresses/dto/address.dto';
import { User } from '~/modules/users/entities/user.entity';

export class UserMapper {
  static toDto(user: User): UserDto {
    return new UserDto({
      id: user.id,
      name: user.name,
      address: user.address
        ? new AddressDto({
            id: user.address.id,
            name: user.address.name,
          })
        : undefined,
    });
  }

  static toEntity(
    userDto: CreateUserDto | UpdateUserDto,
    user = new User(),
  ): User {
    if (userDto.name !== undefined) {
      user.name = userDto.name;
    }

    return user;
  }
}
