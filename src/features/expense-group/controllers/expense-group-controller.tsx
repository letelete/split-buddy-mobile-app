import { ActivityIndicator } from 'react-native';

import { useGetExpenseGroupDetails } from '~/features/expense-group/services/use-get-expense-group-details';

import { ExpenseGroupNavigator } from '~/router/main-navigator/expense-group-navigator/expense-group-navigator';

import { Typography } from '~/ui:lib/molecules/typography';

export interface ExpenseGroupControllerProps {
  groupId: string;
}

const ExpenseGroupController = ({ groupId }: ExpenseGroupControllerProps) => {
  const groupDetailsQuery = useGetExpenseGroupDetails({ groupId });

  if (groupDetailsQuery.isLoading) {
    return <ActivityIndicator />;
  }

  if (groupDetailsQuery.isError) {
    return <Typography.ErrorBody>{groupDetailsQuery.error.message}</Typography.ErrorBody>;
  }

  if (!groupDetailsQuery.data) {
    return <Typography.ErrorBody>Missing data</Typography.ErrorBody>;
  }

  return <ExpenseGroupNavigator data={groupDetailsQuery.data} />;
};

ExpenseGroupController.displayName = 'ExpenseGroupController';

export { ExpenseGroupController };
