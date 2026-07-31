import { CreateUserDto } from '~/modules/users/dto/create-user.dto';
import { UpdateUserDto } from '~/modules/users/dto/update-user.dto';
import { UserDto } from '~/modules/users/dto/user.dto';
import { User } from '~/modules/users/entities/user.entity';

export class UserMapper {
  static toDto(user: User): UserDto {
    return new UserDto({
      id: user.id,
    });
  }

  static toEntity(
    _userDto: CreateUserDto | UpdateUserDto,
    user = new User(),
  ): User {
    return user;
  }
}
