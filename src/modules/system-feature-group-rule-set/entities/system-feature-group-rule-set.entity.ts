import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { SystemFeatureGroupRule } from '~/modules/system-feature-group-rule/entities/system-feature-group-rule.entity';
import { SystemFeatureGroup } from '~/modules/system-feature-group/entities/system-feature-group.entity';

@Entity('system_feature_group_rule_sets')
@Unique(['groupId', 'name'])
export class SystemFeatureGroupRuleSet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'group_id', nullable: false })
  groupId: number;

  @ManyToOne(() => SystemFeatureGroup)
  @JoinColumn({ name: 'group_id' })
  group: SystemFeatureGroup;

  @Column({ length: 255 })
  name: string;

  @OneToMany(() => SystemFeatureGroupRule, (rule) => rule.ruleSet)
  rules: SystemFeatureGroupRule[];
}
