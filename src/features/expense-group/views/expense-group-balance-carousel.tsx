import { useCallback, useMemo } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Balance, ExpenseGroup } from '~/api/types';

import {
  ExpenseGroupBannerBalanceNegative,
  ExpenseGroupBannerBalancePositive,
  ExpenseGroupBannerBalanceSettleUp,
} from '~/features/expense-group/views/expense-group-banner-balance';

import { Carousel } from '~/ui:lib/atoms/carousel';
import { Stylable } from '~/ui:lib/shared/interfaces';

import { createBalancesComparator } from '~/utils/sort';

interface CarouselItem {
  key: string;
  type: 'negative' | 'positive';
  balances: Balance[];
}

const balancesComparator = createBalancesComparator();

export interface ExpenseGroupBalanceCarouselProps extends Stylable {
  group: ExpenseGroup;
  userDisplayName: string;
}

const ExpenseGroupBalanceCarousel = ({
  group,
  userDisplayName,
  containerStyle,
}: ExpenseGroupBalanceCarouselProps) => {
  const { styles } = useStyles(stylesheet);

  const negative = useMemo(
    () => [...group.userBalance.borrowed].sort(balancesComparator),
    [group.userBalance.borrowed]
  );
  const positive = useMemo(
    () => [...group.userBalance.lent].sort(balancesComparator),
    [group.userBalance.lent]
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
          <ExpenseGroupBannerBalancePositive
            balances={item.balances}
            containerStyle={styles.bannerContainer}
            userDisplayName={userDisplayName}
          />
        );
      }
      if (item.type === 'negative') {
        return (
          <ExpenseGroupBannerBalanceNegative
            balances={item.balances}
            containerStyle={styles.bannerContainer}
            userDisplayName={userDisplayName}
          />
        );
      }
      return null;
    },
    [styles.bannerContainer, userDisplayName]
  );

  const renderEmptyComponent = useCallback(
    () => (
      <ExpenseGroupBannerBalanceSettleUp
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

ExpenseGroupBalanceCarousel.displayName = 'ExpenseGroupBalanceCarousel';

export { ExpenseGroupBalanceCarousel };

const stylesheet = createStyleSheet((theme, runtime) => ({
  bannerContainer: {
    width: '100%',
  },
  bannerSettleUpContainer: {
    width: runtime.screen.width - theme.container.padding.horizontal * 2,
  },
}));
