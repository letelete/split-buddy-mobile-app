export const darkTheme = {
  colors: {
    typography: {
      primary: 'rgba(255, 255, 255, 1.0)',
      primarySoft: 'rgba(255, 255, 255, 0.87)',
      secondary: 'rgba(255, 255, 255, 0.64)',
      disabled: 'rgba(255, 255, 255, 0.37)',
      destructive: '#FF453A',
    },
    background: '#000',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    base: 17,
    md: 20,
    lg: 28,
  },
  margins: {
    xs: 2,
    sm: 4,
    base: 8,
    md: 16,
    lg: 24,
    xl: 48,
    xxl: 64,
    xxxl: 96,
  },
  container: {
    padding: {
      horizontal: 24,
    },
  },
  traits: {
    appHeader: {
      background: {
        get color() {
          return darkTheme.colors.background;
        },
      },
      title: {
        get color() {
          return darkTheme.colors.typography.primary;
        },
      },
      action: {
        get color() {
          return darkTheme.colors.typography.primary;
        },
      },
    },
    signUpButton: {
      background: '#fff',
      typography: '#000',
    },
  },
} as const;
