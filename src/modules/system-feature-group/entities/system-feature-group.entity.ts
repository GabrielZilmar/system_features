import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SystemFeatureGroupPermission } from '~/modules/system-feature-group-permission/entities/system-feature-group-permission.entity';

@Entity('system_feature_groups')
export class SystemFeatureGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'key', length: 255, unique: true })
  name: string;

  @OneToMany(
    () => SystemFeatureGroupPermission,
    (permission) => permission.group,
  )
  permissions: SystemFeatureGroupPermission[];
}
