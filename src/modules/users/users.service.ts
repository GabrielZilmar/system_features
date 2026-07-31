import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '~/modules/users/dto/create-user.dto';
import { UpdateUserDto } from '~/modules/users/dto/update-user.dto';
import { UserDto } from '~/modules/users/dto/user.dto';
import { UserMapper } from '~/modules/users/mappers/user.mapper';
import { UserRepository } from '~/modules/users/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.findAll({
      order: { id: 'ASC' },
    });
    return users.map(UserMapper.toDto);
  }

  async findOne(id: number): Promise<UserDto> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`User ${id} was not found`);
    }

    return UserMapper.toDto(user);
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = UserMapper.toEntity(createUserDto);
    const newUser = await this.userRepository.save(user);

    return UserMapper.toDto(newUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`User ${id} was not found`);
    }

    UserMapper.toEntity(updateUserDto, user);

    const updatedUser = await this.userRepository.save(user);
    return UserMapper.toDto(updatedUser);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User ${id} was not found`);
    }

    await this.userRepository.delete(id);
  }
}
