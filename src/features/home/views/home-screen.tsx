import { ExpensesGroupsList } from '~/features/home/views/expenses-groups-list';

import { ScreenContainer } from '~/ui:lib/molecules/screen-container';
import { Typography } from '~/ui:lib/molecules/typography';
import { BannerTotalBalance } from '~/ui:lib/organisms/banner-total-balance';

import { Balance } from '~/utils/types';

const HomeScreen = () => {
  // TODO:mocked
  const balances = [] as Balance[];
  const groups = [] as unknown[];

  return (
    <ScreenContainer>
      <BannerTotalBalance balances={balances} />

      <Typography.SectionTitle>Your buddies</Typography.SectionTitle>
      <ExpensesGroupsList data={groups} />
    </ScreenContainer>
  );
};

HomeScreen.displayName = 'HomeScreen';

export { HomeScreen };
