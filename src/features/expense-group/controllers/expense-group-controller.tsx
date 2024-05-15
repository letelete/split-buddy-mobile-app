import { ActivityIndicator } from 'react-native';

import { useGetExpenseGroupDetails } from '~/features/expense-group/services/use-get-expense-group-details';

import { ExpenseGroupNavigator } from '~/router/main-navigator/expense-group-navigator/expense-group-navigator';

import { ScreenContainer } from '~/ui:lib/molecules/screen-container';
import { Typography } from '~/ui:lib/molecules/typography';

export interface ExpenseGroupControllerProps {
  groupId: string;
}

const ExpenseGroupController = ({ groupId }: ExpenseGroupControllerProps) => {
  const groupDetailsQuery = useGetExpenseGroupDetails({ groupId });

  if (groupDetailsQuery.isLoading) {
    return (
      <ScreenContainer contentCentered>
        <ActivityIndicator />
      </ScreenContainer>
    );
  }

  if (groupDetailsQuery.isError) {
    return (
      <ScreenContainer contentCentered>
        <Typography.ErrorBody>{groupDetailsQuery.error.message}</Typography.ErrorBody>
      </ScreenContainer>
    );
  }

  if (!groupDetailsQuery.data) {
    return (
      <ScreenContainer contentCentered>
        <Typography.ErrorBody>Missing data</Typography.ErrorBody>;
      </ScreenContainer>
    );
  }

  return <ExpenseGroupNavigator data={groupDetailsQuery.data} />;
};

ExpenseGroupController.displayName = 'ExpenseGroupController';

export { ExpenseGroupController };
