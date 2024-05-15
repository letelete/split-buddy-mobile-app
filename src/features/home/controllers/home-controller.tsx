import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { useGetExpensesGroups } from '~/features/expense-group/services/use-get-expenses-groups';
import { useGetUserTotalBalance } from '~/features/expense-group/services/use-get-user-total-balance';
import { ExpensesGroupsList } from '~/features/expense-group/views/expenses-groups-list';
import { HomeBannerTotalBalance } from '~/features/home/views/home-banner-total-balance';
import { HomeHeader } from '~/features/home/views/home-header';
import { HomeToolbar } from '~/features/home/views/home-toolbar';

import { ScreenContainer } from '~/ui:lib/molecules/screen-container';
import { Typography } from '~/ui:lib/molecules/typography';

const HomeController = () => {
  const { styles } = useStyles(stylesheet);

  const [toolbarHeight, setToolbarHeight] = useState(0);

  const balanceQuery = useGetUserTotalBalance();
  const expensesGroupsQuery = useGetExpensesGroups();

  const hasNoGroups = !expensesGroupsQuery.data || expensesGroupsQuery.data.length === 0;

  const StickyHeaderComponent = useCallback(() => {
    return (
      <View style={styles.listContent}>
        <HomeBannerTotalBalance
          balances={balanceQuery.data?.total ?? []}
          loading={balanceQuery.isLoading}
        />

        <Typography.SectionTitle spacingTop='large'>Your buddies</Typography.SectionTitle>
      </View>
    );
  }, [balanceQuery.data?.total, balanceQuery.isLoading, styles.listContent]);

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
