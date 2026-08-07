import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SystemFeatureGroupMembers } from '~/modules/system-feature-group-members/entities/system-feature-group-member.entity';
import { SystemFeatureAccessControl } from '~/modules/system-feature-access-control/entities/system-feature-access-control.entity';
import { SystemFeatureGroupRuleSet } from '~/modules/system-feature-group-rule-set/entities/system-feature-group-rule-set.entity';

@Entity('system_feature_groups')
export class SystemFeatureGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'key', length: 255, unique: true })
  name: string;

  @OneToMany(
    () => SystemFeatureAccessControl,
    (accessControl) => accessControl.group,
  )
  accessControls: SystemFeatureAccessControl[];

  @OneToMany(() => SystemFeatureGroupMembers, (member) => member.group)
  members: SystemFeatureGroupMembers[];

  @OneToMany(() => SystemFeatureGroupRuleSet, (set) => set.group)
  sets: SystemFeatureGroupRuleSet[];
}
