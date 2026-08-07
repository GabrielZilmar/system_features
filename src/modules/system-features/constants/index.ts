export const SYSTEM_FEATURE_KEYS = {
  WALLET: 'WALLET',
  CARDS: 'CARDS',
  SUMSUB: 'SUMSUB',
} as const;

export type SystemFeatureKeys =
  (typeof SYSTEM_FEATURE_KEYS)[keyof typeof SYSTEM_FEATURE_KEYS];
