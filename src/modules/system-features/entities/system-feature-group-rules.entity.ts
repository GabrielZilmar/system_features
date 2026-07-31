import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SystemFeatureGroupRuleSet } from '~/modules/system-features/entities/system-feature-group-rule-sets.entity';

export enum SystemFeaturesAccessDynamicGroupRulesOperatorEnum {
  IN,
  NOT_IN,
}

@Entity('system_feature_group_rules')
export class SystemFeatureGroupRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  ruleSetId: string;

  @ManyToOne(() => SystemFeatureGroupRuleSet)
  @JoinColumn({ name: 'rule_set_id' })
  ruleSet: SystemFeatureGroupRuleSet;

  @Column({ length: 255 })
  field: string;

  @Column('simple-array')
  comparison_values: string[];

  @Column({
    type: 'enum',
    enum: SystemFeaturesAccessDynamicGroupRulesOperatorEnum,
    nullable: false,
  })
  operator: SystemFeaturesAccessDynamicGroupRulesOperatorEnum;
}
