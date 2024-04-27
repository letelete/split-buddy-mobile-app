import { registerRootComponent } from 'expo';
import 'expo-dev-client';

import { SignUpScreen } from '~/ui:components:features/auth/sign-up-screen';

import '~/ui:styles/unistyles';

const App = () => {
  return <SignUpScreen />;
};

App.displayName = 'App';

registerRootComponent(App);
