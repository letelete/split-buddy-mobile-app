import { useCallback } from 'react';

import { ExpenseGroup } from '~/api/types';

import { BalanceCarousel } from '~/features/balance/views/balance-carousel';

import { Stylable } from '~/ui:lib/shared/interfaces';

import { NOT_IMPLEMENTED } from '~/utils/mock';

export interface ExpenseGroupBalanceCarouselProps extends Stylable {
  userDisplayName: string;
  group: ExpenseGroup;
}

const ExpenseGroupBalanceCarousel = ({
  userDisplayName,
  group,
  containerStyle,
}: ExpenseGroupBalanceCarouselProps) => {
  const handleShowAllBalances = useCallback(() => {
    NOT_IMPLEMENTED();
  }, []);

  return (
    <BalanceCarousel
      containerStyle={containerStyle}
      userBalance={group.userBalance}
      userDisplayName={userDisplayName}
      onShowAllNegative={handleShowAllBalances}
      onShowAllPositive={handleShowAllBalances}
    />
  );
};

ExpenseGroupBalanceCarousel.displayName = 'ExpenseGroupBalanceCarousel';

export { ExpenseGroupBalanceCarousel };
