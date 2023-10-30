import {
  BackgroundColors,
  Color,
  Size,
  TextColors,
  TextSizes,
} from '@/model/theme';
import { FC, ReactNode } from 'react';

export interface ButtonProps {
  color?: Color;
  size?: Size;
  children?: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  children,
  color = 'normal',
  size = 'normal',
}) => (
  <button
    className={`cursor-pointer text-lg py-1.5 px-3 rounded-sm ${BackgroundColors[color]} ${TextColors[color]} ${TextSizes[size]}`}
  >
    {children}
  </button>
);
