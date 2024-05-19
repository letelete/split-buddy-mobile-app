import { Balance } from '~/api/types';

import { BannerBalance } from '~/ui:lib/organisms/banner-balance';
import { Stylable } from '~/ui:lib/shared/interfaces';

interface WithBalances {
  balances: Balance[];
}

interface WithUserName {
  userDisplayName: string;
}

interface WithShowAll {
  onShowAll?: () => void;
}

/* -------------------------------------------------------------------------------------------------
 * BalanceBannerNegative
 * -----------------------------------------------------------------------------------------------*/

interface BalanceBannerNegativeProps extends Stylable, WithBalances, WithUserName, WithShowAll {}

const BalanceBannerNegative = ({
  balances,
  userDisplayName,
  containerStyle,
  onShowAll,
}: BalanceBannerNegativeProps) => {
  return (
    <BannerBalance
      balances={balances}
      containerStyle={containerStyle}
      title={`${userDisplayName}, you borrowed`}
      variant='negative'
      onShowAll={onShowAll}
    />
  );
};

BalanceBannerNegative.displayName = 'BalanceBannerNegative';

/* -------------------------------------------------------------------------------------------------
 * BalanceBannerPositive
 * -----------------------------------------------------------------------------------------------*/

interface BalanceBannerPositiveProps extends Stylable, WithBalances, WithUserName, WithShowAll {}

const BalanceBannerPositive = ({
  balances,
  userDisplayName,
  containerStyle,
  onShowAll,
}: BalanceBannerPositiveProps) => {
  return (
    <BannerBalance
      balances={balances}
      containerStyle={containerStyle}
      title={`${userDisplayName}, you lent`}
      variant='positive'
      onShowAll={onShowAll}
    />
  );
};

BalanceBannerPositive.displayName = 'BalanceBannerPositive';

/* -------------------------------------------------------------------------------------------------
 * BalanceBannerSettleUp
 * -----------------------------------------------------------------------------------------------*/

interface BalanceBannerSettleUpProps extends Stylable, WithUserName {}

const BalanceBannerSettleUp = ({ userDisplayName, containerStyle }: BalanceBannerSettleUpProps) => (
  <BannerBalance
    balances={[]}
    containerStyle={containerStyle}
    title={`${userDisplayName}, you're all set!`}
    variant='neutral'
  />
);

BalanceBannerSettleUp.displayName = 'BalanceBannerSettleUp';

/* -----------------------------------------------------------------------------------------------*/

export { BalanceBannerNegative, BalanceBannerPositive, BalanceBannerSettleUp };
export type { BalanceBannerNegativeProps, BalanceBannerPositiveProps, BalanceBannerSettleUpProps };
