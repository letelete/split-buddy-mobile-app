import { useCallback, useMemo } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Balance, UserBalance } from '~/api/types';

import {
  BalanceBannerNegative,
  BalanceBannerPositive,
  BalanceBannerSettleUp,
} from '~/features/balance/views/balance-banner';

import { Carousel } from '~/ui:lib/atoms/carousel';
import { Stylable } from '~/ui:lib/shared/interfaces';

import { createBalancesComparator } from '~/utils/sort';

interface CarouselItem {
  key: string;
  type: 'negative' | 'positive';
  balances: Balance[];
}

const balancesComparator = createBalancesComparator();

export interface BalanceCarouselProps extends Stylable {
  userBalance: UserBalance;
  userDisplayName: string;
  onShowAllPositive?: () => void;
  onShowAllNegative?: () => void;
}

const BalanceCarousel = ({
  userBalance,
  userDisplayName,
  containerStyle,
  onShowAllPositive,
  onShowAllNegative,
}: BalanceCarouselProps) => {
  const { styles } = useStyles(stylesheet);

  const negative = useMemo(
    () => [...userBalance.borrowed].sort(balancesComparator),
    [userBalance.borrowed]
  );
  const positive = useMemo(
    () => [...userBalance.lent].sort(balancesComparator),
    [userBalance.lent]
  );

  const carouselData = useMemo(() => {
    const data = [] as CarouselItem[];
    if (negative.length) {
      data.push({
        key: 'expense-group-balance:negative',
        type: 'negative',
        balances: negative,
      });
    }
    if (positive.length) {
      data.push({
        key: 'expense-group-balance:positive',
        type: 'positive',
        balances: positive,
      });
    }
    return data;
  }, [negative, positive]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<CarouselItem>) => {
      if (item.type === 'positive') {
        return (
          <BalanceBannerPositive
            balances={item.balances}
            containerStyle={styles.bannerContainer}
            userDisplayName={userDisplayName}
            onShowAll={onShowAllPositive}
          />
        );
      }
      if (item.type === 'negative') {
        return (
          <BalanceBannerNegative
            balances={item.balances}
            containerStyle={styles.bannerContainer}
            userDisplayName={userDisplayName}
            onShowAll={onShowAllNegative}
          />
        );
      }
      return null;
    },
    [onShowAllNegative, onShowAllPositive, styles.bannerContainer, userDisplayName]
  );

  const renderEmptyComponent = useCallback(
    () => (
      <BalanceBannerSettleUp
        containerStyle={styles.bannerSettleUpContainer}
        userDisplayName={userDisplayName}
      />
    ),
    [styles.bannerSettleUpContainer, userDisplayName]
  );

  return (
    <Carousel
      CarouselEmptyComponent={renderEmptyComponent}
      containerStyle={containerStyle}
      data={carouselData}
      keyExtractor={(item) => item.key}
      renderItem={renderItem}
    />
  );
};

BalanceCarousel.displayName = 'BalanceCarousel';

export { BalanceCarousel };

const stylesheet = createStyleSheet((theme, runtime) => ({
  bannerContainer: {
    width: '100%',
  },
  bannerSettleUpContainer: {
    width: runtime.screen.width - theme.container.padding.horizontal * 2,
  },
}));
