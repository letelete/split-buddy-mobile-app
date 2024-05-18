import { useCallback } from 'react';

import { UserBalance } from '~/api/types';

import { Banner } from '~/ui:lib/atoms/banner';
import { SkeletonContent } from '~/ui:lib/atoms/skeleton';
import { Typography } from '~/ui:lib/molecules/typography';
import { Stylable, Suspensible } from '~/ui:lib/shared/interfaces';
import { BalanceCarousel } from '~/ui:lib/widgets/balance/views/balance-carousel';

import { NOT_IMPLEMENTED } from '~/utils/mock';

export interface HomeBalanceCarouselProps extends Stylable, Suspensible {
  userDisplayName: string;
  userBalance?: UserBalance;
}

const HomeBalanceCarousel = ({
  userDisplayName,
  userBalance,
  containerStyle,
  loading,
}: HomeBalanceCarouselProps) => {
  const handleShowAllBalances = useCallback(() => {
    NOT_IMPLEMENTED();
  }, []);

  return (
    <SkeletonContent loading={loading}>
      {userBalance ? (
        <BalanceCarousel
          containerStyle={containerStyle}
          userBalance={userBalance}
          userDisplayName={userDisplayName}
          onShowAllNegative={handleShowAllBalances}
          onShowAllPositive={handleShowAllBalances}
        />
      ) : (
        <Banner variant='neutral'>
          <Typography.ErrorBody>Error loading your total balance</Typography.ErrorBody>
        </Banner>
      )}
    </SkeletonContent>
  );
};

HomeBalanceCarousel.displayName = 'HomeBalanceCarousel';

export { HomeBalanceCarousel };
