import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { SystemFeatureGroup } from '~/modules/system-features/entities/system-feature-groups.entity';

@Entity('system_feature_group_rule_sets')
@Unique(['groupId', 'name'])
export class SystemFeatureGroupRuleSet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  groupId: string;

  @ManyToOne(() => SystemFeatureGroup)
  @JoinColumn({ name: 'group_id' })
  group: SystemFeatureGroup;

  @Column({ length: 255 })
  name: string;
}
