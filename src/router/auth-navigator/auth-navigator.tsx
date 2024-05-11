import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignUpScreen } from '~/router/auth-navigator/sign-up-screen';
import { AuthRoutes, AuthStackParamList } from '~/router/types';

export interface AuthNavigatorProps {
  userSignedOut: boolean;
}

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = (props: AuthNavigatorProps) => {
  return (
    <AuthStack.Navigator
      initialRouteName={AuthRoutes.SIGN_UP}
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen
        options={{
          title: 'Split Buddy',
          animationTypeForReplace: props.userSignedOut ? 'pop' : 'push',
        }}
        component={SignUpScreen}
        name={AuthRoutes.SIGN_UP}
      />
    </AuthStack.Navigator>
  );
};

AuthNavigator.displayName = 'AuthNavigator';

export { AuthNavigator };
