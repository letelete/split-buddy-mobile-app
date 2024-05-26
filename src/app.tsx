import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import 'expo-dev-client';
import { useMemo } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';

import { QueryClientProvider } from '~/api/query/query-provider';

import { AuthProvider } from '~/features/auth/providers/auth-provider';

import { AppNavigator } from '~/router/app-navigator';

import { useHaptic } from '~/ui:hooks/use-haptics';

import { ModalProvider, ModalProviderConfig } from '~/ui:lib/organisms/modal';
import { appModalsStack } from '~/ui:lib/widgets/app-modal/controllers/app-modal-controller';

import '~/ui:styles/unistyles';

const App = () => {
  const { theme } = useStyles();
  const openModalHaptic = useHaptic('modal-open');

  const modalProviderConfig = useMemo<ModalProviderConfig>(
    () => ({
      backdropBackgroundColor: theme.colors.modalBackdropBackground,
      backdropOpacity: 0.666,
      onOpen() {
        void openModalHaptic.triggerAsync();
      },
    }),
    [openModalHaptic, theme.colors.modalBackdropBackground]
  );

  return (
    <SafeAreaProvider>
      <QueryClientProvider>
        <AuthProvider>
          <NavigationContainer>
            <ModalProvider config={modalProviderConfig} stack={appModalsStack}>
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
