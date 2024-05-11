import { ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ExpenseGroupHomeController } from '~/features/expense-group/controllers/expense-group-home-controller';

import { useCommonScreenOptions } from '~/router/shared/use-common-screen-options';

export const ExpenseGroupRoutes = {
  HOME: 'ExpenseGroupHome',
} as const;

export interface ExpenseGroupStackParamList extends ParamListBase {
  [ExpenseGroupRoutes.HOME]: undefined;
}

const ExpenseGroupStack = createNativeStackNavigator<ExpenseGroupStackParamList>();

const ExpenseGroupNavigator = () => {
  const commonScreenOptions = useCommonScreenOptions();

  return (
    <ExpenseGroupStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ExpenseGroupStack.Screen
        options={{
          ...commonScreenOptions,
          title: 'Group',
        }}
        component={ExpenseGroupHomeController}
        name={ExpenseGroupRoutes.HOME}
      />
    </ExpenseGroupStack.Navigator>
  );
};

ExpenseGroupNavigator.displayName = 'ExpenseGroupNavigator';

export { ExpenseGroupNavigator };
