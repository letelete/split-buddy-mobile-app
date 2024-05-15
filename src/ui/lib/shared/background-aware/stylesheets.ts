import { createStyleSheet } from 'react-native-unistyles';
import { UnistylesTheme } from 'react-native-unistyles/lib/typescript/src/types';

import { AppTheme } from '~/ui:styles/themes';

export type ForegroundColor = keyof AppTheme['colors']['typography'];

export type Background = 'chip-translucent' | 'base' | `gradient-${keyof AppTheme['gradients']}`;

export type BackgroundToColorMap = Record<Background, Record<ForegroundColor, string>>;

export const defaultBackgroundToColorMap = (theme: UnistylesTheme): BackgroundToColorMap => ({
  base: theme.colors.typography,
  'gradient-neutral': theme.gradients.neutral.foreground,
  'gradient-negative': theme.gradients.negative.foreground,
  'gradient-positive': theme.gradients.positive.foreground,
  'gradient-ios': theme.gradients.ios.foreground,
  'chip-translucent': theme.colors.chipTranslucent.foreground,
});

export const backgroundAwareStylesheet = createStyleSheet((theme) => ({
  backgroundAwareForeground: (
    background: Background,
    color: ForegroundColor = 'primary',
    backgroundToColorMap: BackgroundToColorMap = defaultBackgroundToColorMap(theme)
  ) => ({
    color: backgroundToColorMap[background][color],
  }),
}));
