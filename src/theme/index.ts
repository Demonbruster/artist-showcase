import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    accent: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
    },
  },
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
  },
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  styles: {
    global: {
      body: {
        bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        bgGradient: 'linear(to-br, gray.50, blue.50)',
        color: 'gray.800',
      },
      '*::placeholder': {
        color: 'gray.400',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '600',
        borderRadius: 'xl',
        transition: 'all 0.3s ease',
      },
      variants: {
        solid: {
          boxShadow: 'sm',
          _hover: {
            transform: 'translateY(-2px)',
            boxShadow: 'md',
          },
          _active: {
            transform: 'translateY(0)',
          },
        },
      },
      defaultProps: {
        colorScheme: 'brand',
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'xl',
          boxShadow: 'lg',
          bg: 'white',
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderRadius: 'xl',
            _focus: {
              borderColor: 'brand.400',
              boxShadow: '0 0 0 3px rgba(14, 165, 233, 0.1)',
            },
          },
        },
      },
    },
  },
})

export default theme
