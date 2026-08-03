import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AddressRepository } from '~/modules/addresses/repositories/address.repository';
import { CreateUserDto } from '~/modules/users/dto/create-user.dto';
import { UpdateUserDto } from '~/modules/users/dto/update-user.dto';
import { UserDto } from '~/modules/users/dto/user.dto';
import { UserMapper } from '~/modules/users/mappers/user.mapper';
import { UserRepository } from '~/modules/users/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly dataSource: DataSource,
  ) {}

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
    const newUser = await this.dataSource.transaction(async (manager) => {
      const userRepository = new UserRepository(manager);
      const addressRepository = new AddressRepository(manager);

      const duplicatedUser = await userRepository.findByName(
        createUserDto.name,
      );
      if (duplicatedUser) {
        throw new ConflictException(
          `User with name: ${createUserDto.name} already exists`,
        );
      }

      const user = UserMapper.toEntity(createUserDto);
      const savedUser = await userRepository.save(user);

      if (createUserDto.address) {
        await addressRepository.save({
          name: createUserDto.address.name,
          user: savedUser,
        });
      }

      return userRepository.findById(savedUser.id);
    });

    return UserMapper.toDto(newUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const updatedUser = await this.dataSource.transaction(async (manager) => {
      const userRepository = new UserRepository(manager);
      const addressRepository = new AddressRepository(manager);

      const user = await userRepository.findById(id);

      if (!user) {
        throw new NotFoundException(`User ${id} was not found`);
      }

      if (
        updateUserDto.name !== undefined &&
        updateUserDto.name !== user.name
      ) {
        const duplicatedUser = await userRepository.findByName(
          updateUserDto.name,
        );

        if (duplicatedUser && duplicatedUser.id !== id) {
          throw new ConflictException(
            `User with name: ${updateUserDto.name} already exists`,
          );
        }
      }

      UserMapper.toEntity(updateUserDto, user);
      await userRepository.save(user);

      if (updateUserDto.address) {
        const address =
          user.address ?? (await addressRepository.create({ user }));
        address.name = updateUserDto.address.name;

        await addressRepository.save(address);
      }

      return userRepository.findById(id);
    });

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
