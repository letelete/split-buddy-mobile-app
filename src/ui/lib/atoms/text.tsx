import { PropsWithChildren, createContext, useContext } from 'react';
import { TextProps as NativeTextProps } from 'react-native';
import Animated, { AnimatedProps } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { AnimatedStylableText } from '~/ui:lib/shared/interfaces';
import { StylesheetVariants } from '~/ui:lib/shared/stylesheet';

import { AppTheme } from '~/ui:styles/themes';

export type Color = keyof AppTheme['colors']['typography'];

export type Size = keyof AppTheme['fontSizes'];

export type Weight = 'normal' | 'semiBold' | 'bold';

export type Background = `gradient-${keyof AppTheme['gradients']}`;

export interface TextContextProps {
  /**
   * A background on which the text is render on. Defaults to theme's background color.
   */
  background?: Background;
}

export const TextContext = createContext<TextContextProps>({});

export interface TextProps extends AnimatedProps<NativeTextProps>, AnimatedStylableText {
  testID?: string;
  size?: Size;
  color?: Color;
  weight?: Weight;
  onBackground?: Background;
}

const Text = ({
  children,
  containerStyle,
  color,
  weight,
  onBackground,
  size,
  testID,
  ...rest
}: PropsWithChildren<TextProps>) => {
  const textContext = useContext(TextContext);
  const { styles } = useStyles(stylesheet, {
    color,
    weight,
    size,
  });

  return (
    <Animated.Text
      {...rest}
      style={[
        styles.container,
        textContext.background && styles.containerOnBackground(textContext.background),
        containerStyle,
      ]}
      testID={testID}
    >
      {children}
    </Animated.Text>
  );
};

Text.displayName = 'Text';

export { Text };

const stylesheet = createStyleSheet((theme) => ({
  container: {
    variants: {
      color: {
        primary: { color: theme.colors.typography.primary },
        primarySoft: { color: theme.colors.typography.primarySoft },
        secondary: { color: theme.colors.typography.secondary },
        disabled: { color: theme.colors.typography.disabled },
        destructive: { color: theme.colors.typography.destructive },
        default: {
          color: theme.colors.typography.primary,
        },
      } satisfies StylesheetVariants<Color>,
      weight: {
        normal: { fontWeight: '400' },
        semiBold: { fontWeight: '600' },
        bold: { fontWeight: '700' },
      } satisfies StylesheetVariants<Weight>,
      size: {
        xs: { fontSize: theme.fontSizes.xs },
        sm: { fontSize: theme.fontSizes.sm },
        base: { fontSize: theme.fontSizes.base },
        md: { fontSize: theme.fontSizes.md },
        lg: { fontSize: theme.fontSizes.lg },
        default: { fontSize: theme.fontSizes.base },
      } satisfies StylesheetVariants<Size>,
    },
  },
  containerOnBackground: (background: Background, color: Color = 'primary') => {
    const backgroundToColorMap = {
      'gradient-neutral': theme.gradients.neutral.foreground,
      'gradient-negative': theme.gradients.negative.foreground,
      'gradient-positive': theme.gradients.positive.foreground,
    } satisfies Record<Background, Record<Color, string>>;
    return {
      color: backgroundToColorMap[background][color],
    };
  },
}));
