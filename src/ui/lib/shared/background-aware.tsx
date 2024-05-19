import { PropsWithChildren, createContext } from 'react';
import { createStyleSheet } from 'react-native-unistyles';
import { UnistylesTheme } from 'react-native-unistyles/lib/typescript/src/types';

import { AppTheme } from '~/ui:styles/themes';

/* -------------------------------------------------------------------------------------------------
 * BackgroundAwareContext
 * -----------------------------------------------------------------------------------------------*/

interface BackgroundAwareContextProps {
  /**
   * A background on which the foreground is rendered on. Defaults to theme's background color.
   */
  background: Background;
}

const BackgroundAwareContext = createContext<BackgroundAwareContextProps>({
  background: 'base',
});

interface BackgroundAwareContextProviderProps {
  value?: BackgroundAwareContextProps;
}

const BackgroundAwareContextProvider = ({
  children,
  value,
}: PropsWithChildren<BackgroundAwareContextProviderProps>) => (
  <BackgroundAwareContext.Provider
    value={{
      ...value,
      background: value?.background ?? 'base',
    }}
  >
    {children}
  </BackgroundAwareContext.Provider>
);

/* -------------------------------------------------------------------------------------------------
 * Styles
 * -----------------------------------------------------------------------------------------------*/

type ForegroundColor = keyof AppTheme['colors']['typography'];

type Background = 'chip-translucent' | 'base' | `gradient-${keyof AppTheme['gradients']}`;

type BackgroundToColorMap = Record<Background, Record<ForegroundColor, string>>;

const defaultBackgroundToColorMap = (theme: UnistylesTheme): BackgroundToColorMap => ({
  base: theme.colors.typography,
  'gradient-neutral': theme.gradients.neutral.foreground,
  'gradient-negative': theme.gradients.negative.foreground,
  'gradient-positive': theme.gradients.positive.foreground,
  'gradient-ios': theme.gradients.ios.foreground,
  'chip-translucent': theme.colors.chipTranslucent.foreground,
});

const backgroundAwareStylesheet = createStyleSheet((theme) => ({
  backgroundAwareForeground: (
    background: Background,
    color: ForegroundColor = 'primary',
    backgroundToColorMap: BackgroundToColorMap = defaultBackgroundToColorMap(theme)
  ) => ({
    color: backgroundToColorMap[background][color],
  }),
}));

/* -----------------------------------------------------------------------------------------------*/

export {
  BackgroundAwareContext,
  BackgroundAwareContextProvider,
  defaultBackgroundToColorMap,
  backgroundAwareStylesheet,
};
export type {
  BackgroundAwareContextProps,
  BackgroundAwareContextProviderProps,
  ForegroundColor,
  Background,
  BackgroundToColorMap,
};
