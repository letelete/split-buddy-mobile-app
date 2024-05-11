import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ExpenseGroupHomeController } from '~/features/expense-group/controllers/expense-group-home-controller';

import { ExpenseGroupRoutes, ExpenseGroupStackParamList } from '~/router/types';

export interface ExpenseGroupHomeScreenProps
  extends NativeStackScreenProps<ExpenseGroupStackParamList, typeof ExpenseGroupRoutes.HOME> {}

const ExpenseGroupHomeScreen = ({ route }: ExpenseGroupHomeScreenProps) => {
  return <ExpenseGroupHomeController data={route.params.data} />;
};

ExpenseGroupHomeScreen.displayName = 'ExpenseGroupHomeScreen';

export { ExpenseGroupHomeScreen };
