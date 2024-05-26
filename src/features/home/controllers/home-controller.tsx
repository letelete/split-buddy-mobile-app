import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { useGetExpensesGroups } from '~/features/expense-group/services/use-get-expenses-groups';
import { useGetUserDetails } from '~/features/expense-group/services/use-get-user-details';
import { useGetUserTotalBalance } from '~/features/expense-group/services/use-get-user-total-balance';
import { ExpensesGroupsList } from '~/features/expense-group/views/expenses-groups-list';
import { HomeBalanceCarousel } from '~/features/home/views/home-balance-carousel';
import { HomeHeader } from '~/features/home/views/home-header';
import { HomeToolbar } from '~/features/home/views/home-toolbar';

import { ScreenContainer } from '~/ui:lib/molecules/screen-container';
import { Typography } from '~/ui:lib/molecules/typography';
import { useAppModalContext } from '~/ui:lib/widgets/app-modal/hooks/use-app-modal-context';

const HomeController = () => {
  const { styles } = useStyles(stylesheet);
  const appModalContext = useAppModalContext();

  const [toolbarHeight, setToolbarHeight] = useState(0);

  const user = useGetUserDetails();
  const balanceQuery = useGetUserTotalBalance();
  const expensesGroupsQuery = useGetExpensesGroups();

  const hasNoGroups = !expensesGroupsQuery.data || expensesGroupsQuery.data.length === 0;

  const handleShowAllBalances = useCallback(() => {
    if (balanceQuery.data) {
      appModalContext.openModal('home:balance', {
        userBalance: balanceQuery.data,
        balanceSourcesCount: expensesGroupsQuery.data?.length ?? 0,
      });
    }
  }, [appModalContext, balanceQuery.data, expensesGroupsQuery.data?.length]);

  const StickyHeaderComponent = useCallback(() => {
    return (
      <View>
        <HomeBalanceCarousel
          loading={balanceQuery.isLoading || user.isLoading}
          userBalance={balanceQuery.data}
          userDisplayName={user.data?.displayName ?? ''}
          onShowAllBalances={handleShowAllBalances}
        />

        <ScreenContainer.HorizontalPaddingBox>
          <Typography.SectionTitle spacingTop='large'>Your buddies</Typography.SectionTitle>
        </ScreenContainer.HorizontalPaddingBox>
      </View>
    );
  }, [balanceQuery.data, balanceQuery.isLoading, handleShowAllBalances]);

  return (
    <ScreenContainer containerStyle={[{ paddingBottom: toolbarHeight }]} variant='fullscreen'>
      <HomeHeader />

      <ExpensesGroupsList
        data={expensesGroupsQuery.data ?? []}
        itemContainerStyle={styles.listContent}
        ListHeaderComponent={StickyHeaderComponent}
        loading={expensesGroupsQuery.isLoading}
      />

      <HomeToolbar
        disableNewExpense={hasNoGroups}
        onLayout={(e) => setToolbarHeight(e.nativeEvent.layout.height)}
      />
    </ScreenContainer>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  listContent: {
    paddingHorizontal: theme.container.padding.horizontal,
  },
  itemContainerStyle: {
    paddingHorizontal: theme.container.padding.horizontal,
  },
}));

HomeController.displayName = 'HomeController';

export { HomeController };
