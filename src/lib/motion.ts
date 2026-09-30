export const ease = {
  out: "power3.out",
  inOut: "power2.inOut",
  expo: "expo.out",
  soft: "power1.out",
} as const;

export const duration = {
  fast: 0.2,
  medium: 0.45,
  cinematic: 1.1,
  loader: 1.6,
} as const;

export const stagger = {
  tight: 0.04,
  base: 0.08,
  loose: 0.14,
} as const;
