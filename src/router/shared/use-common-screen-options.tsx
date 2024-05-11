import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import { useStyles } from 'react-native-unistyles';

export function useCommonScreenOptions() {
  const { theme } = useStyles();

  const options = useMemo(
    () =>
      ({
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: theme.traits.appHeader.background.color,
        },
        headerTintColor: theme.traits.appHeader.action.color,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: theme.traits.appHeader.title.color,
        },
      }) as const satisfies NativeStackNavigationOptions,
    [
      theme.traits.appHeader.action.color,
      theme.traits.appHeader.background.color,
      theme.traits.appHeader.title.color,
    ]
  );

  return options;
}
