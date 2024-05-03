import { useCallback } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { useGetExpensesGroups } from '~/features/home/services/use-get-expenses-groups';
import { useGetUserTotalBalance } from '~/features/home/services/use-get-user-total-balance';
import { ExpensesGroupsList } from '~/features/home/views/expenses-groups-list';

import { ScreenContainer } from '~/ui:lib/molecules/screen-container';
import { Typography } from '~/ui:lib/molecules/typography';
import { BannerTotalBalance } from '~/ui:lib/organisms/banner-total-balance';

const HomeScreen = () => {
  const { styles } = useStyles(stylesheet);

  const balanceQuery = useGetUserTotalBalance();
  const expensesGroupsQuery = useGetExpensesGroups();

  const StickyHeaderComponent = useCallback(() => {
    return (
      <View>
        <BannerTotalBalance
          balances={balanceQuery.data?.balances ?? []}
          loading={balanceQuery.isLoading}
        />

        <Typography.SectionTitle spacingTop='large'>Your buddies</Typography.SectionTitle>
      </View>
    );
  }, [balanceQuery.data?.balances, balanceQuery.isLoading]);

  return (
    <ScreenContainer paddingHorizontal={false}>
      <ExpensesGroupsList
        containerStyle={styles.listContainer}
        data={expensesGroupsQuery.data ?? []}
        loading={expensesGroupsQuery.isLoading}
        StickyHeaderComponent={StickyHeaderComponent}
      />
    </ScreenContainer>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  listContainer: {
    paddingHorizontal: theme.container.padding.horizontal,
  },
}));

HomeScreen.displayName = 'HomeScreen';

export { HomeScreen };
