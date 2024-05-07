import { UnistylesRegistry } from 'react-native-unistyles';

import { darkTheme, lightTheme } from '~/ui:styles/themes';

export interface AppThemes {
  dark: typeof darkTheme;
  light: typeof lightTheme;
}

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry.addThemes({
  dark: darkTheme,
  light: lightTheme,
}).addConfig({
  adaptiveThemes: true,
  initialTheme: 'dark',
});
