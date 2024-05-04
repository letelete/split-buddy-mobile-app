import { ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext, useMemo } from 'react';
import { useStyles } from 'react-native-unistyles';

import { AuthContext, AuthState } from '~/features/auth/providers/auth-provider';
import { SignUpScreen } from '~/features/auth/views/sign-up-screen';
import { HomeScreen } from '~/features/home/views/home-screen';
import { ProfileButton } from '~/features/home/views/profile-button';
import { SplashScreen } from '~/features/splash/views/splash-screen';

import { UserAvatar } from '~/ui:lib/organisms/user-avatar';

/** ------------------------------------------------------------------------------------------------
 * Auth Routes
 * ---------------------------------------------------------------------------------------------- */

export const AuthRoutes = {
  SIGN_UP: 'AuthSignUp',
} as const;

export interface AuthStackParamList extends ParamListBase {
  [AuthRoutes.SIGN_UP]: undefined;
}

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackScreen = () => {
  const commonScreenOptions = useCommonScreenOptions();

  return (
    <AuthStack.Navigator
      initialRouteName={AuthRoutes.SIGN_UP}
      screenOptions={{ ...commonScreenOptions }}
    >
      <AuthStack.Screen
        component={SignUpScreen}
        name={AuthRoutes.SIGN_UP}
        options={{ title: 'Split Buddy' }}
      />
    </AuthStack.Navigator>
  );
};

AuthStackScreen.displayName = 'AuthStackScreen';

/** ------------------------------------------------------------------------------------------------
 * Profile routes
 * ---------------------------------------------------------------------------------------------- */

export const ProfileRoutes = {
  HOME: 'ProfileHome',
} as const;

export interface ProfileStackParamList extends ParamListBase {
  [ProfileRoutes.HOME]: undefined;
}

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStackScreen = () => {
  const commonScreenOptions = useCommonScreenOptions();

  return (
    <ProfileStack.Navigator
      initialRouteName={ProfileRoutes.HOME}
      screenOptions={{ ...commonScreenOptions }}
    >
      <ProfileStack.Screen
        component={SignUpScreen}
        name={ProfileRoutes.HOME}
        options={{ title: 'Profile' }}
      />
    </ProfileStack.Navigator>
  );
};

ProfileStackScreen.displayName = 'ProfileStackScreen';

/** ------------------------------------------------------------------------------------------------
 * Root routes
 * ---------------------------------------------------------------------------------------------- */

export const RootRoutes = {
  HOME: 'RootHome',
  PROFILE: 'RootProfile',
  NOTIFICATIONS: 'RootNotifications',
} as const;

export interface RootStackParamList extends ParamListBase {
  [RootRoutes.HOME]: undefined;
  [RootRoutes.PROFILE]: undefined;
  [RootRoutes.NOTIFICATIONS]: undefined;
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackScreen = () => {
  const commonScreenOptions = useCommonScreenOptions();

  return (
    <RootStack.Navigator
      screenOptions={{
        ...commonScreenOptions,
      }}
      initialRouteName={RootRoutes.HOME}
    >
      <RootStack.Screen
        options={{
          title: 'Split Buddy',
          headerLeft: () => <ProfileButton />,
        }}
        component={HomeScreen}
        name={ProfileRoutes.HOME}
      />
    </RootStack.Navigator>
  );
};

RootStackScreen.displayName = 'RootStackScreen';

/** ------------------------------------------------------------------------------------------------
 * App Navigator
 * ---------------------------------------------------------------------------------------------- */

export const AppRoutes = {
  AUTH: 'AppAuth',
  ROOT: 'AppRoot',
} as const;

export interface AppStackParamList extends ParamListBase {
  [AppRoutes.AUTH]: undefined;
  [AppRoutes.ROOT]: undefined;
}

const AppStack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  const { authState, userSignedOut } = useContext(AuthContext);

  const currentScreen = useMemo(() => {
    if (authState === AuthState.NOT_AUTHORIZED) {
      return (
        <AppStack.Screen
          options={{
            animationTypeForReplace: userSignedOut ? 'pop' : 'push',
          }}
          component={AuthStackScreen}
          name={AppRoutes.AUTH}
        />
      );
    }
    return <AppStack.Screen component={RootStackScreen} name={AppRoutes.ROOT} />;
  }, [userSignedOut, authState]);

  if (authState === AuthState.CHECKING) {
    return <SplashScreen />;
  }

  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {currentScreen}
    </AppStack.Navigator>
  );
};

AppNavigator.displayName = 'AppNavigator';

export { AppNavigator };

/** ------------------------------------------------------------------------------------------------
 * Commons
 * ---------------------------------------------------------------------------------------------- */

function useCommonScreenOptions() {
  const { theme } = useStyles();

  const options = useMemo(
    () =>
      ({
        headerStyle: {
          backgroundColor: theme.traits.appHeader.background.color,
        },
        headerTintColor: theme.traits.appHeader.action.color,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: theme.traits.appHeader.title.color,
        },
      }) as const,
    [
      theme.traits.appHeader.action.color,
      theme.traits.appHeader.background.color,
      theme.traits.appHeader.title.color,
    ]
  );

  return options;
}
