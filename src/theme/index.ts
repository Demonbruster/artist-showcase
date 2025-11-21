import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#ffe8e8' },
          100: { value: '#ffcccc' },
          200: { value: '#ff9999' },
          300: { value: '#ff6666' },
          400: { value: '#ff3333' },
          500: { value: '#ff0000' },
          600: { value: '#cc0000' },
          700: { value: '#990000' },
          800: { value: '#660000' },
          900: { value: '#330000' },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);

