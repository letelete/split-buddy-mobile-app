import { useMemo } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { useBannerVariantForBalance } from '~/ui:hooks/use-banner-variant-for-balance';

import { Banner } from '~/ui:lib/atoms/banner';
import { BalanceSummary } from '~/ui:lib/molecules/balance-total-summary';
import { Typography } from '~/ui:lib/molecules/typography';
import { Stylable } from '~/ui:lib/shared/interfaces';

import { createBalancesComparator } from '~/utils/sort';
import { Balance } from '~/utils/types';

export interface BannerTotalBalanceProps extends Stylable {
  balances: Balance[];
}

const balancesComparator = createBalancesComparator();

const BannerTotalBalance = ({ balances }: BannerTotalBalanceProps) => {
  const { styles } = useStyles(stylesheet);
  const bannerVariant = useBannerVariantForBalance(balances);
  const nonNeutralSortedBalances = useMemo(
    () => balances.sort(balancesComparator).filter((balance) => balance.value !== 0),
    [balances]
  );

  const isSettleUp = nonNeutralSortedBalances.length === 0;

  return (
    <Banner variant={bannerVariant}>
      <Typography.Body containerStyle={styles.title}>
        {isSettleUp ? "You're all set up!" : 'Your total balance'}
      </Typography.Body>

      {isSettleUp ? (
        <Typography.Body>🥳</Typography.Body>
      ) : (
        <BalanceSummary balances={nonNeutralSortedBalances} centered />
      )}
    </Banner>
  );
};

const stylesheet = createStyleSheet(() => ({
  title: {
    textAlign: 'center',
  },
}));

BannerTotalBalance.displayName = 'BannerTotalBalance';

export { BannerTotalBalance };
