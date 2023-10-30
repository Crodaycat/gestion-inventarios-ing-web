export interface ColorsMap {
  normal: string;
  primary: string;
  secondary: string;
  success: string;
  danger: string;
}

export type Color = keyof ColorsMap;

export const TextColors: ColorsMap = Object.freeze({
  normal: 'text-white',
  primary: 'text-white',
  secondary: 'text-black',
} as ColorsMap);

export const BackgroundColors: ColorsMap = Object.freeze({
  normal: 'bg-transparent',
  primary: 'bg-cyan-400',
  secondary: 'bg-transparent',
} as ColorsMap);

export interface SizesMap {
  small: string;
  normal: string;
  medium: string;
  large: string;
  extraLarge: string;
}

export type Size = keyof SizesMap;

export const TextSizes: SizesMap = Object.freeze({
  small: 'text-xs',
  normal: 'text-base',
  large: 'text-lg',
  extraLarge: 'text-xl',
} as SizesMap);
