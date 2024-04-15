import containerQueries from '@tailwindcss/container-queries';
import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Raleway', 'sans-serif'],
      },
      colors: {
        'off-black': '#1d1d1d',
        'off-white': '#fffcf7',
      },
      spacing: {
        main: '0.75rem',
      },
    },
  },
  plugins: [containerQueries],
} satisfies Config;
