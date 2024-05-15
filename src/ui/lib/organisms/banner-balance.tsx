import { useMemo } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Balance } from '~/api/types';

import { Banner, BannerProps } from '~/ui:lib/atoms/banner';
import { Chip, ChipText } from '~/ui:lib/atoms/chip';
import { BalanceSummary, BalanceSummarySettledUp } from '~/ui:lib/molecules/balance-summary';
import { Typography } from '~/ui:lib/molecules/typography';

export interface BannerBalanceProps extends BannerProps {
  balances: Balance[];
  title: string;
  limit?: number;
  onShowAll?: () => void;
}

const BannerBalance = ({
  balances,
  title,
  limit = 3,
  onShowAll,
  containerStyle,
  ...rest
}: BannerBalanceProps) => {
  const { styles } = useStyles(stylesheet);

  const isSettledUp = balances.length === 0;
  const showAllBalances = balances.length <= limit;
  const visibleBalances = useMemo(
    () => (showAllBalances ? balances : balances.slice(0, Math.max(1, limit - 1))),
    [balances, limit, showAllBalances]
  );
  const hiddenBalancesCount = balances.length - visibleBalances.length;

  return (
    <Banner containerStyle={[styles.container, containerStyle]} {...rest}>
      <Typography.Body containerStyle={styles.title} disablePadding>
        {title}
      </Typography.Body>

      {isSettledUp ? (
        <BalanceSummarySettledUp />
      ) : (
        <BalanceSummary balances={visibleBalances} showSign='none' centered />
      )}

      {hiddenBalancesCount > 0 && (
        <Chip containerStyle={styles.chipContainer} interactive onPress={onShowAll}>
          <ChipText color='primary'>{`Show ${hiddenBalancesCount} more`}</ChipText>
        </Chip>
      )}
    </Banner>
  );
};

BannerBalance.displayName = 'BannerBalance';

const stylesheet = createStyleSheet((theme) => ({
  container: {
    width: '100%',
    minHeight: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    paddingBottom: theme.margins.base,
  },
  chipContainer: {
    marginTop: theme.margins.base,
  },
}));

export { BannerBalance };
