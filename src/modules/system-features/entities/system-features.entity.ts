import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SystemFeatureGroupPermission } from '~/modules/system-feature-group-permission/entities/system-feature-group-permission.entity';

@Entity('system_features')
export class SystemFeature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true, nullable: false })
  key: string;

  @Column({ length: 255, nullable: true })
  displayName: string | null;

  @Column({ nullable: true })
  description: string | null;

  @Column({ default: true })
  isEnabled: boolean;

  @OneToMany(
    () => SystemFeatureGroupPermission,
    (permission) => permission.feature,
  )
  groupPermissions: SystemFeatureGroupPermission[];
}
