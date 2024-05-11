import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ExpenseGroupController } from '~/features/expense-group/controllers/expense-group-controller';

import { MainRoutes, MainStackParamList } from '~/router/types';

export interface ExpenseGroupScreenProps
  extends NativeStackScreenProps<MainStackParamList, typeof MainRoutes.EXPENSE_GROUP> {}

const ExpenseGroupScreen = ({ route }: ExpenseGroupScreenProps) => {
  return <ExpenseGroupController groupId={route.params.groupId} />;
};

ExpenseGroupScreen.displayName = 'ExpenseGroupScreen';

export { ExpenseGroupScreen };
