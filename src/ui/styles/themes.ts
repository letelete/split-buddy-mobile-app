/* -------------------------------------------------------------------------------------------------
 * App Theme
 * -----------------------------------------------------------------------------------------------*/

type AppTheme = typeof appTheme;

const appTheme = {
  colors: {
    typography: {
      primary: 'rgba(255, 255, 255, 1.0)',
      primarySoft: 'rgba(255, 255, 255, 0.87)',
      secondary: 'rgba(255, 255, 255, 0.64)',
      disabled: 'rgba(255, 255, 255, 0.37)',
      decorative: 'rgba(255, 255, 255, 0.16)',
      destructive: '#FF453A',
    },
    get baseGradientTypography() {
      return this.typography;
    },
    background: '#000',
    modalBackdropBackground: '#000',
    get chipTranslucent() {
      return {
        background: 'rgba(255, 255, 255, 0.34)',
        foreground: this.typography,
      };
    },
  },
  get gradients() {
    const colors = this.colors;
    return {
      neutral: {
        solid: '#1C1C1E',
        values: ['#222222', '#111111'],
        foreground: colors.baseGradientTypography,
      },
      positive: {
        values: ['#A2B919', '#459E37'],
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
    xl: 40,
    full: 9999,
  },
  container: {
    padding: {
      horizontal: 16,
    },
  },
};

/* -------------------------------------------------------------------------------------------------
 * Dark Theme
 * -----------------------------------------------------------------------------------------------*/

const darkTheme = {
  ...appTheme,
} satisfies AppTheme;

/* -------------------------------------------------------------------------------------------------
 * Light Theme
 * -----------------------------------------------------------------------------------------------*/

const lightTheme = {
  ...appTheme,
} satisfies AppTheme;

/* -----------------------------------------------------------------------------------------------*/

export { appTheme, darkTheme, lightTheme };
export type { AppTheme };
