import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { SystemFeature } from '~/modules/system-features/entities/system-features.entity';
import { SystemFeatureGroup } from '~/modules/system-features/entities/system_feature_groups.entity';

@Entity('system_feature_group_permissions')
export class SystemFeatureGroupPermission {
  @PrimaryColumn({ name: 'group_id' })
  groupId: number;

  @PrimaryColumn({ name: 'feature_id' })
  featureId: number;

  @Column({ default: true })
  isAllowed: boolean;

  // We will not use cascade deletes to ensure a more robust and safer data model.
  @ManyToOne(() => SystemFeatureGroup)
  @JoinColumn({ name: 'group_id' })
  group: SystemFeatureGroup;

  // We will not use cascade deletes to ensure a more robust and safer data model.
  @ManyToOne(() => SystemFeature)
  @JoinColumn({ name: 'feature_id' })
  feature: SystemFeature;
}
