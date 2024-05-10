export type AppTheme = typeof baseTheme;

export const baseTheme = {
  colors: {
    typography: {
      primary: 'rgba(255, 255, 255, 1.0)',
      primarySoft: 'rgba(255, 255, 255, 0.87)',
      secondary: 'rgba(255, 255, 255, 0.64)',
      disabled: 'rgba(255, 255, 255, 0.37)',
      destructive: '#FF453A',
    },
    get baseGradientTypography() {
      return this.typography;
    },
    background: '#000',
  },
  get gradients() {
    const colors = this.colors;
    return {
      neutral: {
        values: ['#222222', '#111111'],
        foreground: colors.baseGradientTypography,
      },
      positive: {
        values: ['#ADD100', '#52610A'],
        foreground: colors.baseGradientTypography,
      },
      negative: {
        values: ['#F857A6', '#FF5858'],
        foreground: colors.baseGradientTypography,
      },
      ios: {
        values: ['#A8AEBC', '#8C909B'],
        foreground: colors.baseGradientTypography,
      },
    };
  },
  get traits() {
    const colors = this.colors;
    return {
      appHeader: {
        background: {
          get color() {
            return colors.background;
          },
        },
        title: {
          get color() {
            return colors.typography.primary;
          },
        },
        action: {
          get color() {
            return colors.typography.primary;
          },
          size: 28,
        },
      },
      signUpButton: {
        background: '#fff',
        typography: '#000',
      },
      skeleton: {
        background: '#222',
        foreground: '#666',
      },
      avatar: {
        background: '#666',
        title: '#fff',
        borderColor: {
          onCard: '#202020',
        },
      },
      scrollable: {
        indicator: 'white' as 'default' | 'black' | 'white' | undefined,
      },
    };
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
  rounded: {
    base: 13,
    baseInner: 11,
    full: 9999,
  },
  container: {
    padding: {
      horizontal: 24,
    },
  },
};

export const darkTheme = { ...baseTheme } satisfies AppTheme;

export const lightTheme = {
  ...baseTheme,
  colors: {
    typography: {
      primary: 'rgba(0, 0, 0, 1.0)',
      primarySoft: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.64)',
      disabled: 'rgba(0, 0, 0, 0.37)',
      destructive: '#EF291F',
    },
    baseGradientTypography: {
      primary: 'rgba(0, 0, 0, 1.0)',
      primarySoft: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.64)',
      disabled: 'rgba(0, 0, 0, 0.37)',
      destructive: '#FFFFFF',
    },
    background: '#FFF',
  },
  get gradients() {
    const colors = this.colors;
    const baseGradientTypographyInverted = {
      primary: 'rgba(255, 255, 255, 1.0)',
      primarySoft: 'rgba(255, 255, 255, 0.87)',
      secondary: 'rgba(255, 255, 255, 0.64)',
      disabled: 'rgba(255, 255, 255, 0.37)',
      destructive: '#FFFFFF',
    };
    return {
      neutral: {
        values: ['#f5f5f5', '#fff'],
        foreground: colors.baseGradientTypography,
      },
      positive: {
        values: ['#6A9113', '#141517'],
        foreground: baseGradientTypographyInverted,
      },
      negative: {
        values: ['#FF0084', '#33001B'],
        foreground: baseGradientTypographyInverted,
      },
      ios: {
        values: ['#A8AEBC', '#8C909B'],
        foreground: baseGradientTypographyInverted,
      },
    };
  },
  traits: {
    appHeader: {
      background: {
        color: '#fff',
      },
      title: {
        color: '#000',
      },
      action: {
        color: '#000',
        size: 28,
      },
    },
    signUpButton: {
      background: '#000',
      typography: '#fff',
    },
    skeleton: {
      background: '#f6f6f6',
      foreground: '#666',
    },
    avatar: {
      background: '#b6b6b6',
      title: '#111',
      borderColor: {
        onCard: '#f5f5f5',
      },
    },
    scrollable: {
      indicator: 'black',
    },
  },
} satisfies AppTheme;
