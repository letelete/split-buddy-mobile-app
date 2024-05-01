import { useMemo } from 'react';

import { BannerVariant } from '~/ui:lib/atoms/banner';

import { Balance } from '~/utils/types';

export const useBannerVariantForBalance = (balances: Balance[]): BannerVariant => {
  const someNegativeBalance = useMemo(
    () => balances.some((balance) => balance.value < 0),
    [balances]
  );
  const somePositiveBalance = useMemo(
    () => balances.some((balance) => balance.value > 0),
    [balances]
  );

  if (someNegativeBalance) {
    return 'negative';
  }

  if (somePositiveBalance) {
    return 'positive';
  }

  return 'neutral';
};
