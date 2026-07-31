import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User } from '~/modules/users/entities/user.entity';
import { BaseRepository } from '~/shared/repositories/base/base-repository';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(entityManager?: EntityManager) {
    super(User, entityManager);
  }

  async findById(id: number) {
    if (!id) {
      throw new InternalServerErrorException('Missing params: id.');
    }

    return this.repo.findOne({
      where: { id },
    });
  }
}
