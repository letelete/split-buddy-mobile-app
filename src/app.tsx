import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import 'expo-dev-client';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { QueryClientProvider } from '~/api/query/query-provider';

import { AuthProvider } from '~/features/auth/providers/auth-provider';

import { AppNavigator } from '~/router/app-navigator';

import { ModalProvider } from '~/ui:lib/organisms/modal';
import { appModalsStack } from '~/ui:lib/widgets/app-modal/controllers/app-modal-controller';

import '~/ui:styles/unistyles';

const App = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider>
        <AuthProvider>
          <NavigationContainer>
            <ModalProvider stack={appModalsStack}>
              <AppNavigator />
            </ModalProvider>
          </NavigationContainer>
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

App.displayName = 'App';

registerRootComponent(App);
