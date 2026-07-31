import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SystemFeatureGroupPermission } from '~/modules/system-features/entities/system-feature-group-permissions.entity';

@Entity('system_feature_groups')
export class SystemFeatureGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true })
  key: string;

  @OneToMany(
    () => SystemFeatureGroupPermission,
    (permission) => permission.group,
  )
  permissions: SystemFeatureGroupPermission[];
}
