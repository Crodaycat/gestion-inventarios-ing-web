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
  disabled?: boolean;
  type?: 'submit' | 'button' | 'reset';
}

export const Button: FC<ButtonProps> = ({
  children,
  color = 'normal',
  size = 'normal',
  onClick,
  disabled = false,
  type = 'button',
}) => (
  <button
    className={`cursor-pointer decoration-inherit text-lg py-1.5 px-3 rounded-md ${BackgroundColors[color]} ${TextColors[color]} ${TextSizes[size]}`}
    onClick={onClick}
    disabled={disabled}
    type={type}
  >
    {children}
  </button>
);
