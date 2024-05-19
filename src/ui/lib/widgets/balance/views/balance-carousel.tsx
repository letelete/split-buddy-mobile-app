import { createContext, useCallback, useContext, useMemo } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Balance, UserBalance } from '~/api/types';

import { Carousel } from '~/ui:lib/atoms/carousel';
import { Stylable } from '~/ui:lib/shared/interfaces';
import {
  BalanceBannerNegative,
  BalanceBannerPositive,
  BalanceBannerSettleUp,
} from '~/ui:lib/widgets/balance/views/balance-banner';

import { createBalancesComparator } from '~/utils/sort';

/* -------------------------------------------------------------------------------------------------
 * BalanceCarousel
 * -----------------------------------------------------------------------------------------------*/

interface BalanceCarouselContextProps {
  onChange?: (item: BalanceCarouselItem, index: number) => void;
}

const BalanceCarouselContext = createContext<BalanceCarouselContextProps>({});

/* -----------------------------------------------------------------------------------------------*/

const balancesComparator = createBalancesComparator();

interface BalanceCarouselItem {
  key: string;
  type: 'negative' | 'positive';
  balances: Balance[];
}

interface BalanceCarouselProps extends Stylable {
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
  const context = useContext(BalanceCarouselContext);

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
    const data = [] as BalanceCarouselItem[];
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
    ({ item }: ListRenderItemInfo<BalanceCarouselItem>) => {
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

  const handleCarouselChange = useCallback(
    (index: number) => {
      context.onChange?.(carouselData[index], index);
    },
    [carouselData, context]
  );

  return (
    <Carousel
      CarouselEmptyComponent={renderEmptyComponent}
      containerStyle={containerStyle}
      data={carouselData}
      keyExtractor={(item) => item.key}
      renderItem={renderItem}
      onChange={handleCarouselChange}
    />
  );
};

BalanceCarousel.displayName = 'BalanceCarousel';

const stylesheet = createStyleSheet((theme, runtime) => ({
  bannerContainer: {
    width: '100%',
  },
  bannerSettleUpContainer: {
    width: runtime.screen.width - theme.container.padding.horizontal * 2,
  },
}));

/* -----------------------------------------------------------------------------------------------*/

export { BalanceCarouselContext, BalanceCarousel };
export type { BalanceCarouselContextProps, BalanceCarouselItem, BalanceCarouselProps };
