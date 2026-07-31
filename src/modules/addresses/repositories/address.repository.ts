import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Address } from '~/modules/addresses/entities/address.entity';
import { BaseRepository } from '~/shared/repositories/base/base-repository';

@Injectable()
export class AddressRepository extends BaseRepository<Address> {
  constructor(entityManager?: EntityManager) {
    super(Address, entityManager);
  }

  async findById(id: number) {
    if (!id) {
      throw new InternalServerErrorException('Missing params: id.');
    }

    return this.repo.findOne({
      where: { id },
    });
  }

  async create(data: Partial<Address>) {
    return this.repo.create(data);
  }
}
