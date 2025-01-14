import type { Config } from 'tailwindcss';
import { BackgroundColors, TextColors, TextSizes } from './model/theme';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      height: {
        svh: '100svh',
      },
      minHeight: {
        svh: '100svh',
      },
    },
  },
  safelist: [
    ...Object.values(TextColors),
    ...Object.values(BackgroundColors),
    ...Object.values(TextSizes),
  ],
  plugins: [],
};
export default config;
