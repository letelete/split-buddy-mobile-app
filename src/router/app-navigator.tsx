import { useContext } from 'react';

import { AuthContext, AuthState } from '~/features/auth/providers/auth-provider';

import { AuthNavigator } from '~/router/auth-navigator/auth-navigator';
import { MainNavigator } from '~/router/main-navigator/main-navigator';
import { SplashScreen } from '~/router/splash-screen';

const AppNavigator = () => {
  const { authState, userSignedOut } = useContext(AuthContext);

  if (authState === AuthState.CHECKING) {
    return <SplashScreen />;
  }

  if (authState === AuthState.NOT_AUTHORIZED) {
    return <AuthNavigator userSignedOut={userSignedOut} />;
  }

  return <MainNavigator />;
};

AppNavigator.displayName = 'AppNavigator';

export { AppNavigator };
