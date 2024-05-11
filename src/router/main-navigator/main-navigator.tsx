import { ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ExpenseGroupScreen } from '~/router/main-navigator/expense-group-navigator/expense-group-screen';
import { HomeScreen } from '~/router/main-navigator/home-screen';
import { useCommonScreenOptions } from '~/router/shared/use-common-screen-options';

export const MainRoutes = {
  HOME: 'Home',
  EXPENSE_GROUP: 'ExpenseGroup',
} as const;

export interface MainStackParamList extends ParamListBase {
  [MainRoutes.HOME]: undefined;
}

const MainStack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  const commonScreenOptions = useCommonScreenOptions();

  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen
        component={HomeScreen}
        name={MainRoutes.HOME}
        options={{ ...commonScreenOptions }}
      />
      <MainStack.Screen component={ExpenseGroupScreen} name={MainRoutes.EXPENSE_GROUP} />
    </MainStack.Navigator>
  );
};

MainNavigator.displayName = 'MainNavigator';

export { MainNavigator };
