import { useMemo } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Balance } from '~/api/types';

import { useBannerVariantForBalance } from '~/ui:hooks/use-color-for-balance';

import { Banner } from '~/ui:lib/atoms/banner';
import { SkeletonContent } from '~/ui:lib/atoms/skeleton';
import { BalanceSummary } from '~/ui:lib/molecules/balance-total-summary';
import { Typography } from '~/ui:lib/molecules/typography';
import { Stylable, Suspensible } from '~/ui:lib/shared/interfaces';

import { createBalancesComparator } from '~/utils/sort';

export interface BannerTotalBalanceProps extends Stylable, Suspensible {
  balances: Balance[];
}

const balancesComparator = createBalancesComparator();

const BannerTotalBalance = ({ balances, containerStyle, loading }: BannerTotalBalanceProps) => {
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
          <Typography.LargeTitle disablePadding>🥳</Typography.LargeTitle>
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

BannerTotalBalance.displayName = 'BannerTotalBalance';

export { BannerTotalBalance };
