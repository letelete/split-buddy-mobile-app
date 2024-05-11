import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ExpenseGroupDetails } from '~/api/types';

import { ExpenseGroupHomeScreen } from '~/router/main-navigator/expense-group-navigator/expense-group-home-screen';
import { ExpenseGroupRoutes, ExpenseGroupStackParamList } from '~/router/types';

const ExpenseGroupStack = createNativeStackNavigator<ExpenseGroupStackParamList>();

export interface ExpenseGroupNavigatorProps {
  data: ExpenseGroupDetails;
}

const ExpenseGroupNavigator = ({ data }: ExpenseGroupNavigatorProps) => {
  return (
    <ExpenseGroupStack.Navigator
      initialRouteName={ExpenseGroupRoutes.HOME}
      screenOptions={{ headerShown: false }}
    >
      <ExpenseGroupStack.Screen
        component={ExpenseGroupHomeScreen}
        initialParams={{ data }}
        name={ExpenseGroupRoutes.HOME}
      />
    </ExpenseGroupStack.Navigator>
  );
};

ExpenseGroupNavigator.displayName = 'ExpenseGroupNavigator';

export { ExpenseGroupNavigator };
