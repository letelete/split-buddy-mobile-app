import { UserBalance } from '~/api/types';

import { Banner } from '~/ui:lib/atoms/banner';
import { SkeletonContent } from '~/ui:lib/atoms/skeleton';
import { Typography } from '~/ui:lib/molecules/typography';
import { Stylable, Suspensible } from '~/ui:lib/shared/interfaces';
import { BalanceCarousel } from '~/ui:lib/widgets/balance/views/balance-carousel';

/* -------------------------------------------------------------------------------------------------
 * HomeBalanceCarousel
 * -----------------------------------------------------------------------------------------------*/

interface HomeBalanceCarouselProps extends Stylable, Suspensible {
  userDisplayName: string;
  userBalance?: UserBalance;
  onShowAllBalances?: () => void;
}

const HomeBalanceCarousel = ({
  userDisplayName,
  userBalance,
  containerStyle,
  loading,
  onShowAllBalances,
}: HomeBalanceCarouselProps) => {
  return (
    <SkeletonContent loading={loading}>
      {userBalance ? (
        <BalanceCarousel
          containerStyle={containerStyle}
          userBalance={userBalance}
          userDisplayName={userDisplayName}
          onShowAllNegative={onShowAllBalances}
          onShowAllPositive={onShowAllBalances}
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

/* -----------------------------------------------------------------------------------------------*/

export { HomeBalanceCarousel };
export type { HomeBalanceCarouselProps };
