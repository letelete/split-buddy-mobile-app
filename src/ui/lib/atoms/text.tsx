import { PropsWithChildren } from 'react';
import { TextProps as NativeTextProps } from 'react-native';
import Animated, { AnimatedProps } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Stylable } from '~/ui:lib/shared/interfaces';
import { StylesheetVariants } from '~/ui:lib/shared/stylesheet';

export type Color = 'primary' | 'primarySoft' | 'secondary' | 'disabled' | 'destructive';

export type Size = 'xs' | 'sm' | 'base' | 'md' | 'lg';

export type Weight = 'normal' | 'semiBold' | 'bold';

export interface TextProps extends AnimatedProps<NativeTextProps>, Stylable {
  testID?: string;
  size?: Size;
  color?: Color;
  weight?: Weight;
}

const Text = ({
  children,
  containerStyle,
  color,
  weight,
  size,
  testID,
  ...rest
}: PropsWithChildren<TextProps>) => {
  const { styles } = useStyles(stylesheet, {
    color,
    weight,
    size,
  });

  return (
    <Animated.Text {...rest} style={[styles.container, containerStyle]} testID={testID}>
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
}));
