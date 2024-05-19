import { UnistylesRegistry } from 'react-native-unistyles';

import { darkTheme, lightTheme } from '~/ui:styles/themes';

/* -------------------------------------------------------------------------------------------------
 * Themes
 * -----------------------------------------------------------------------------------------------*/

interface AppThemes {
  dark: typeof darkTheme;
  light: typeof lightTheme;
}

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

/* -------------------------------------------------------------------------------------------------
 * Injectors
 * -----------------------------------------------------------------------------------------------*/

UnistylesRegistry.addThemes({
  dark: darkTheme,
  light: lightTheme,
}).addConfig({
  adaptiveThemes: true,
  initialTheme: 'dark',
});

/* -----------------------------------------------------------------------------------------------*/

export { AppThemes };
