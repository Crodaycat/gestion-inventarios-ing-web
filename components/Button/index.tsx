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
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({
  children,
  color = 'normal',
  size = 'normal',
  onClick,
}) => (
  <button
    className={`cursor-pointer text-lg py-1.5 px-3 rounded-sm ${BackgroundColors[color]} ${TextColors[color]} ${TextSizes[size]}`}
    onClick={onClick}
  >
    {children}
  </button>
);
