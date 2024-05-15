import { useCallback } from 'react';

import { Balance } from '~/api/types';

import { BannerBalance } from '~/ui:lib/organisms/banner-balance';
import { Stylable } from '~/ui:lib/shared/interfaces';

export interface WithBalances {
  balances: Balance[];
}

export interface WithUserName {
  userDisplayName: string;
}

const useShowAllBalances = () => {
  const showAllBalances = useCallback(() => {
    console.warn('Not implemented');
    // TODO: ...
  }, []);

  return [showAllBalances] as const;
};

export interface ExpenseGroupBannerBalanceNegativeProps
  extends Stylable,
    WithBalances,
    WithUserName {}

const ExpenseGroupBannerBalanceNegative = ({
  balances,
  userDisplayName,
  containerStyle,
}: ExpenseGroupBannerBalanceNegativeProps) => {
  const [showAllBalances] = useShowAllBalances();

  return (
    <BannerBalance
      balances={balances}
      containerStyle={containerStyle}
      title={`${userDisplayName}, you borrowed`}
      variant='negative'
      onShowAll={showAllBalances}
    />
  );
};

ExpenseGroupBannerBalanceNegative.displayName = 'ExpenseGroupBannerBalanceNegative';

export { ExpenseGroupBannerBalanceNegative };

export interface ExpenseGroupBannerBalancePositiveProps
  extends Stylable,
    WithBalances,
    WithUserName {}

const ExpenseGroupBannerBalancePositive = ({
  balances,
  userDisplayName,
  containerStyle,
}: ExpenseGroupBannerBalancePositiveProps) => {
  const [showAllBalances] = useShowAllBalances();

  return (
    <BannerBalance
      balances={balances}
      containerStyle={containerStyle}
      title={`${userDisplayName}, you lent`}
      variant='positive'
      onShowAll={showAllBalances}
    />
  );
};

ExpenseGroupBannerBalancePositive.displayName = 'ExpenseGroupBannerBalancePositive';

export { ExpenseGroupBannerBalancePositive };

export interface ExpenseGroupBannerBalanceSettleUpProps extends Stylable, WithUserName {}

const ExpenseGroupBannerBalanceSettleUp = ({
  userDisplayName,
  containerStyle,
}: ExpenseGroupBannerBalanceSettleUpProps) => (
  <BannerBalance
    balances={[]}
    containerStyle={containerStyle}
    title={`${userDisplayName}, you're all set!`}
    variant='neutral'
  />
);

ExpenseGroupBannerBalanceSettleUp.displayName = 'ExpenseGroupBannerBalanceSettleUp';

export { ExpenseGroupBannerBalanceSettleUp };
