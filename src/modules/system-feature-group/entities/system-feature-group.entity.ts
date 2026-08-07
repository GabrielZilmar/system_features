import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SystemFeatureGroupMembers } from '~/modules/system-feature-group-members/entities/system-feature-group-member.entity';
import { SystemFeatureGroupPermission } from '~/modules/system-feature-group-permission/entities/system-feature-group-permission.entity';
import { SystemFeatureGroupRuleSet } from '~/modules/system-feature-group-rule-set/entities/system-feature-group-rule-set.entity';

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

  @OneToMany(() => SystemFeatureGroupMembers, (member) => member.group)
  members: SystemFeatureGroupMembers[];

  @OneToMany(() => SystemFeatureGroupRuleSet, (set) => set.group)
  sets: SystemFeatureGroupRuleSet[];
}
