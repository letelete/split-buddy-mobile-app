import { ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignUpScreen } from '~/router/auth-navigator/sign-up-screen';
import { useCommonScreenOptions } from '~/router/shared/use-common-screen-options';

export const AuthRoutes = {
  SIGN_UP: 'AuthSignUp',
} as const;

export interface AuthStackParamList extends ParamListBase {
  [AuthRoutes.SIGN_UP]: undefined;
}

export interface AuthNavigatorProps {
  userSignedOut: boolean;
}

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = (props: AuthNavigatorProps) => {
  const commonScreenOptions = useCommonScreenOptions();

  return (
    <AuthStack.Navigator
      initialRouteName={AuthRoutes.SIGN_UP}
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen
        options={{
          ...commonScreenOptions,
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
