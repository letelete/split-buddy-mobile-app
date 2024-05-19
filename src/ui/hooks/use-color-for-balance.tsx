import { useMemo } from 'react';

import { Balance } from '~/api/types';

import { BannerVariant } from '~/ui:lib/atoms/banner';
import { LinearGradient } from '~/ui:lib/atoms/gradient';

const useCommonBalanceInfo = (balances: Balance[]) => {
  const someNegativeBalance = useMemo(
    () => balances.some((balance) => balance.value < 0),
    [balances]
  );
  const somePositiveBalance = useMemo(
    () => balances.some((balance) => balance.value > 0),
    [balances]
  );

  return { someNegativeBalance, somePositiveBalance };
};

/* -------------------------------------------------------------------------------------------------
 * Banner variant
 * -----------------------------------------------------------------------------------------------*/

const useBannerVariantForBalance = (balances: Balance[]): BannerVariant => {
  const { someNegativeBalance, somePositiveBalance } = useCommonBalanceInfo(balances);

  if (someNegativeBalance) {
    return 'negative';
  }

  if (somePositiveBalance) {
    return 'positive';
  }

  return 'neutral';
};

/* -------------------------------------------------------------------------------------------------
 * Gradient
 * -----------------------------------------------------------------------------------------------*/

const useGradientForBalance = (balances: Balance[]) => {
  const { someNegativeBalance, somePositiveBalance } = useCommonBalanceInfo(balances);

  if (someNegativeBalance) {
    return LinearGradient.Negative;
  }

  if (somePositiveBalance) {
    return LinearGradient.Positive;
  }

  return LinearGradient.Neutral;
};

/* -----------------------------------------------------------------------------------------------*/

export { useBannerVariantForBalance, useGradientForBalance };
