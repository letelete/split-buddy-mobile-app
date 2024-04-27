import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import 'expo-dev-client';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppNavigator } from '~/router/app-navigator';

import '~/ui:styles/unistyles';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

App.displayName = 'App';

registerRootComponent(App);
