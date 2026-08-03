export const GROUP_RULE_FIELDS = {
  USER_NAME: 'users.name',
  ADDRESS_NAME: 'addresses.name',
} as const;

export type GroupRuleFields =
  (typeof GROUP_RULE_FIELDS)[keyof typeof GROUP_RULE_FIELDS];
