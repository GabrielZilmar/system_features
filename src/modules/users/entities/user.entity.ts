import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from '~/modules/addresses/entities/address.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true })
  name: string;

  @OneToOne(() => Address, (address) => address.user, { eager: true })
  address?: Address;
}
