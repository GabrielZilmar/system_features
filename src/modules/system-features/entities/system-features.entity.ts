import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SystemFeatureAccessControl } from '~/modules/system-feature-access-control/entities/system-feature-access-control.entity';
import { SystemFeatureKeys } from '~/modules/system-features/constants';

@Entity('system_features')
export class SystemFeature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true, nullable: false })
  key: SystemFeatureKeys;

  @Column({ length: 255, nullable: true })
  displayName: string | null;

  @Column({ nullable: true })
  description: string | null;

  @Column({ default: true })
  isEnabled: boolean;

  @OneToMany(
    () => SystemFeatureAccessControl,
    (permission) => permission.feature,
  )
  accessControls: SystemFeatureAccessControl[];
}
