import { useMemo } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Balance } from '~/api/types';

import { useBannerVariantForBalance } from '~/ui:hooks/use-color-for-balance';

import { Banner } from '~/ui:lib/atoms/banner';
import { SkeletonContent } from '~/ui:lib/atoms/skeleton';
import { BalanceSummary, BalanceSummarySettledUp } from '~/ui:lib/molecules/balance-summary';
import { Typography } from '~/ui:lib/molecules/typography';
import { Stylable, Suspensible } from '~/ui:lib/shared/interfaces';

import { createBalancesComparator } from '~/utils/sort';

export interface HomeBannerTotalBalanceProps extends Stylable, Suspensible {
  balances: Balance[];
}

const balancesComparator = createBalancesComparator();

const HomeBannerTotalBalance = ({
  balances,
  containerStyle,
  loading,
}: HomeBannerTotalBalanceProps) => {
  const { styles } = useStyles(stylesheet);
  const bannerVariant = useBannerVariantForBalance(balances);
  const nonZeroBalances = useMemo(
    () => balances.sort(balancesComparator).filter((balance) => balance.value !== 0),
    [balances]
  );

  const isSettleUp = nonZeroBalances.length === 0;
  const titleContent = isSettleUp ? "You're all set!" : 'Your total balance';

  return (
    <Banner containerStyle={containerStyle} variant={bannerVariant}>
      <Typography.Body containerStyle={styles.title}>
        {loading ? 'Loading your balance' : titleContent}
      </Typography.Body>

      <SkeletonContent loading={loading}>
        {isSettleUp ? (
          <BalanceSummarySettledUp />
        ) : (
          <BalanceSummary balances={nonZeroBalances} centered />
        )}
      </SkeletonContent>
    </Banner>
  );
};

const stylesheet = createStyleSheet(() => ({
  title: {
    textAlign: 'center',
  },
}));

HomeBannerTotalBalance.displayName = 'HomeBannerTotalBalance';

export { HomeBannerTotalBalance };
