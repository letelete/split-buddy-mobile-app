import { useGetExpensesGroups } from '~/features/home/services/use-get-expenses-groups';
import { useGetUserTotalBalance } from '~/features/home/services/use-get-user-total-balance';
import { ExpensesGroupsList } from '~/features/home/views/expenses-groups-list';

import { ScreenContainer } from '~/ui:lib/molecules/screen-container';
import { Typography } from '~/ui:lib/molecules/typography';
import { BannerTotalBalance } from '~/ui:lib/organisms/banner-total-balance';

const HomeScreen = () => {
  const balanceQuery = useGetUserTotalBalance();
  const expensesGroupsQuery = useGetExpensesGroups();

  return (
    <ScreenContainer>
      <BannerTotalBalance
        balances={balanceQuery.data?.balances ?? []}
        loading={balanceQuery.isLoading}
      />

      <Typography.SectionTitle spacingTop='large'>Your buddies</Typography.SectionTitle>
      <ExpensesGroupsList
        data={expensesGroupsQuery.data ?? []}
        loading={expensesGroupsQuery.isLoading}
      />
    </ScreenContainer>
  );
};

HomeScreen.displayName = 'HomeScreen';

export { HomeScreen };
