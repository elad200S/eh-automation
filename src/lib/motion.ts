// Shared motion tokens — all animation values come from here

export const duration = {
  instant:  0.15,
  fast:     0.35,
  base:     0.65,
  slow:     1.0,
  reveal:   1.2,
  entrance: 1.8,
} as const;

export const ease = {
  out:      'power2.out',
  outStrong:'power3.out',
  inOut:    'power2.inOut',
  spring:   'back.out(1.3)',
  smooth:   [0.16, 1, 0.3, 1] as [number,number,number,number],
} as const;

export const stagger = {
  tight:  0.04,
  base:   0.08,
  loose:  0.15,
} as const;

export const scrub = {
  default: 1.2,
  tight:   0.6,
} as const;
