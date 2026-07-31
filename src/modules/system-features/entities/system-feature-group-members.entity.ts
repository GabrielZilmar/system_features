import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { SystemFeatureGroup } from '~/modules/system-features/entities/system-feature-groups.entity';
import { User } from '~/modules/users/entities/user.entity';

@Entity('system_feature_group_members')
export class SystemFeatureGroupMembers {
  @PrimaryColumn({ name: 'group_id' })
  groupId: number;

  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  // We will not use cascade deletes to ensure a more robust and safer data model.
  @ManyToOne(() => SystemFeatureGroup)
  @JoinColumn({ name: 'group_id' })
  group: SystemFeatureGroup;

  // We will not use cascade deletes to ensure a more robust and safer data model.
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
