import { PropsWithChildren, useContext } from 'react';
import { TextProps as NativeTextProps } from 'react-native';
import Animated, { AnimatedProps } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { BackgroundAwareContext } from '~/ui:lib/shared/background-aware/providers';
import { backgroundAwareStylesheet } from '~/ui:lib/shared/background-aware/stylesheets';
import { AnimatedStylableText } from '~/ui:lib/shared/interfaces';
import { StylesheetVariants } from '~/ui:lib/shared/stylesheet';

import { AppTheme } from '~/ui:styles/themes';

export type Color = keyof AppTheme['colors']['typography'];

export type Size = keyof AppTheme['fontSizes'];

export type Weight = 'normal' | 'semiBold' | 'bold';

export interface TextProps extends AnimatedProps<NativeTextProps>, AnimatedStylableText {
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
  const backgroundAwareContext = useContext(BackgroundAwareContext);
  const { styles: backgroundAwareStyles } = useStyles(backgroundAwareStylesheet);
  const { styles } = useStyles(stylesheet, {
    weight,
    size,
  });

  return (
    <Animated.Text
      {...rest}
      style={[
        styles.container,
        backgroundAwareContext.background &&
          backgroundAwareStyles.backgroundAwareForeground(backgroundAwareContext.background, color),
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
