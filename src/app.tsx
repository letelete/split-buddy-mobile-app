import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import 'expo-dev-client';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { QueryClientProvider } from '~/api/query/query-provider';

import { AuthProvider } from '~/features/auth/providers/auth-provider';

import { AppNavigator } from '~/router/app-navigator';

import '~/ui:styles/unistyles';

const App = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider>
        <AuthProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

App.displayName = 'App';

registerRootComponent(App);
