import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ExpenseGroupScreen } from '~/router/main-navigator/expense-group-navigator/expense-group-screen';
import { HomeScreen } from '~/router/main-navigator/home-screen';
import { MainRoutes, MainStackParamList } from '~/router/types';

const MainStack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen component={HomeScreen} name={MainRoutes.HOME} />
      <MainStack.Screen component={ExpenseGroupScreen} name={MainRoutes.EXPENSE_GROUP} />
    </MainStack.Navigator>
  );
};

MainNavigator.displayName = 'MainNavigator';

export { MainNavigator };
