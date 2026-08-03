import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SystemFeatureGroupRuleSet } from '~/modules/system-feature-group-rule-set/entities/system-feature-group-rule-set.entity';
import { GroupRuleFields } from '~/modules/system-feature-group-rule/constants';

export enum SystemFeaturesAccessDynamicGroupRulesOperatorEnum {
  IN = 'IN',
  NOT_IN = 'NOT_IN',
}

@Entity('system_feature_group_rules')
export class SystemFeatureGroupRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  ruleSetId: number;

  @ManyToOne(() => SystemFeatureGroupRuleSet)
  @JoinColumn({ name: 'rule_set_id' })
  ruleSet: SystemFeatureGroupRuleSet;

  @Column({ length: 255 })
  field: GroupRuleFields;

  @Column('simple-array')
  comparisonValues: string[];

  @Column({
    type: 'enum',
    enum: SystemFeaturesAccessDynamicGroupRulesOperatorEnum,
    nullable: false,
  })
  operator: SystemFeaturesAccessDynamicGroupRulesOperatorEnum;
}
