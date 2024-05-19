import { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Balance, ExpenseGroup, ExpenseGroupMember, UserBalance } from '~/api/types';

import { ExpenseGroupBalanceCarousel } from '~/features/expense-group/views/expense-group-balance-carousel';

import { Banner } from '~/ui:lib/atoms/banner';
import { Chip, ChipAvatar, ChipProps, ChipText, ChipTextSm } from '~/ui:lib/atoms/chip';
import { LinearGradient } from '~/ui:lib/atoms/gradient';
import { AvatarsStack } from '~/ui:lib/molecules/labeled-avatars-stack';
import { ScreenContainer } from '~/ui:lib/molecules/screen-container';
import { Typography } from '~/ui:lib/molecules/typography';
import { Background } from '~/ui:lib/shared/background-aware/stylesheets';
import { Stylable } from '~/ui:lib/shared/interfaces';
import {
  BalanceCarouselContext,
  BalanceCarouselContextProps,
  BalanceCarouselItem,
} from '~/ui:lib/widgets/balance/views/balance-carousel';

import { createBalancesComparator } from '~/utils/sort';
import { formatCurrency } from '~/utils/string';

export interface ExpenseGroupBalanceSummaryProps extends Stylable {
  group: ExpenseGroup;
  userDisplayName: string;
}

const ExpenseGroupBalanceSummary = ({
  group,
  userDisplayName,
  containerStyle,
}: ExpenseGroupBalanceSummaryProps) => {
  const { styles } = useStyles(stylesheet);

  const carouselIndex = useSharedValue(0);
  const [currentCarouselItem, setCurrentCarouselItem] = useState<BalanceCarouselItem>({
    key: 'expense-group-balance-summary:initial-item',
    type: 'negative',
    balances: [],
  });

  const [lastCarouselNavigationDirection, setLastCarouselNavigationDirection] = useState<-1 | 1>(1);

  useAnimatedReaction(
    () => carouselIndex.value,
    (currentIndex, previousIndex) => {
      const direction = previousIndex && currentIndex <= previousIndex ? -1 : 1;
      runOnJS(setLastCarouselNavigationDirection)(direction);
    }
  );

  const { balanceMembers, actionTitleForCarouselItem, variantForCarouselItem } =
    useBalanceMembersForCarouselItem(group, currentCarouselItem);

  const balanceCarouselContextValue = useMemo<BalanceCarouselContextProps>(
    () => ({
      onChange: (item, index) => {
        carouselIndex.value = index;
        setCurrentCarouselItem({ ...item });
      },
    }),
    [carouselIndex]
  );

  return (
    <View style={containerStyle}>
      <BalanceCarouselContext.Provider value={balanceCarouselContextValue}>
        <ExpenseGroupBalanceCarousel group={group} userDisplayName={userDisplayName} />
      </BalanceCarouselContext.Provider>

      {balanceMembers.length > 0 && (
        <Animated.View
          key={currentCarouselItem.key}
          entering={
            lastCarouselNavigationDirection === 1 ? FadeInLeft.springify() : FadeInRight.springify()
          }
          exiting={
            lastCarouselNavigationDirection === 1
              ? FadeOutLeft.springify()
              : FadeOutRight.springify()
          }
        >
          <ScreenContainer.HorizontalPaddingBox>
            <BannerBalanceMembers
              actionTitle={actionTitleForCarouselItem}
              containerStyle={styles.membersContainer}
              members={balanceMembers}
              variant={variantForCarouselItem}
            />
          </ScreenContainer.HorizontalPaddingBox>
        </Animated.View>
      )}
    </View>
  );
};

ExpenseGroupBalanceSummary.displayName = 'ExpenseGroupBalanceSummary';

export { ExpenseGroupBalanceSummary };

const stylesheet = createStyleSheet((theme) => ({
  membersContainer: {
    marginTop: theme.margins.md,
  },
}));

const descendingBalanceComparator = createBalancesComparator({ strategy: 'descending' });

const useBalanceMembersForCarouselItem = (group: ExpenseGroup, item: BalanceCarouselItem) => {
  const variantForCarouselItem = useMemo<BannerBalanceMembersProps['variant']>(
    () => item.type,
    [item.type]
  );

  const actionTitleForCarouselItem = useMemo(
    () =>
      (
        ({
          negative: 'Settle up',
          positive: 'Remind',
        }) satisfies Record<BalanceCarouselItem['type'], string>
      )[item.type],
    [item.type]
  );

  const userBalanceForCarouselItem = useMemo(
    () =>
      (
        ({
          negative: 'borrowed',
          positive: 'lent',
        }) satisfies Record<BalanceCarouselItem['type'], keyof UserBalance>
      )[item.type],
    [item.type]
  );

  const balanceMembers = useMemo(() => {
    const memberHasSomeBalanceActive = (member: ExpenseGroupMember) => {
      return (
        member.userBalance[userBalanceForCarouselItem] &&
        member.userBalance[userBalanceForCarouselItem].length > 0
      );
    };

    const mapToBalanceMember = (member: ExpenseGroupMember) => {
      const balances = getSortedBalancesForCarouselItem(
        member.userBalance[userBalanceForCarouselItem]
      );
      return {
        id: member.id,
        displayName: member.displayName,
        imageUri: member.imageUrl,
        balances,
      } satisfies BalanceMember;
    };

    /** Sorts balances by the order of the `item`'s balances */
    const getSortedBalancesForCarouselItem = (balances: Balance[]) => {
      return [...balances]
        .map((balance) => {
          const balanceRank = item.balances.findIndex(
            (itemBalance) => itemBalance.currency.code === balance.currency.code
          );

          return [balanceRank === -1 ? item.balances.length : balanceRank, balance] as const;
        })
        .sort(([aRank, aBalance], [bRank, bBalance]) => {
          if (aRank === bRank) {
            return descendingBalanceComparator(aBalance, bBalance);
          }
          return aRank <= bRank ? -1 : 1;
        })
        .map(([_, balance]) => balance);
    };

    const balanceMembersComparator = (a: BalanceMember, b: BalanceMember) => {
      for (let i = 0; i < Math.min(a.balances.length, b.balances.length); ++i) {
        if (a.balances[i].value === b.balances[i].value) {
          continue;
        }
        return a.balances[i].value > b.balances[i].value ? -1 : 1;
      }

      return a.balances.length >= b.balances.length ? -1 : 1;
    };

    return [...group.members]
      .filter(memberHasSomeBalanceActive)
      .map(mapToBalanceMember)
      .sort(balanceMembersComparator);
  }, [group.members, item.balances, userBalanceForCarouselItem]);

  return { variantForCarouselItem, actionTitleForCarouselItem, balanceMembers } as const;
};

interface BalanceMember {
  id: string;
  displayName: string;
  balances: Balance[];
  imageUri?: string;
}

interface BannerBalanceMembersProps extends Stylable {
  members: BalanceMember[];
  variant: BalanceMemberChipProps['variant'];
  actionTitle: string;
  membersLimit?: number;
  onMemberPress?: (member: BalanceMember) => void;
  onActionPress?: (member: BalanceMember) => void;
  onShowAllPress?: () => void;
}

const BannerBalanceMembers = ({
  members,
  variant,
  membersLimit = 2,
  actionTitle,
  onMemberPress,
  onActionPress,
  onShowAllPress,
  containerStyle,
}: BannerBalanceMembersProps) => {
  const { styles, theme } = useStyles(bannerBalanceMembersStylesheet);

  const visibleMembers = useMemo(
    () => members.slice(0, Math.max(membersLimit, 1)),
    [members, membersLimit]
  );
  const hiddenMembers = useMemo(
    () => members.slice(visibleMembers.length),
    [members, visibleMembers.length]
  );

  return (
    <Banner
      containerStyle={[containerStyle]}
      contentContainerStyle={styles.contentContainer}
      variant='neutral'
    >
      <View style={styles.balanceMembersRowsContainer}>
        {visibleMembers.map((member) => (
          <BalanceMemberRow key={`balance-member-row:${member.id}`}>
            <BalanceMemberChip
              member={member}
              variant={variant}
              onPress={() => onMemberPress?.(member)}
            />

            <TouchableOpacity onPress={() => onActionPress?.(member)}>
              <Typography.Caption1 color='primary' weight='semiBold' disablePadding>
                {actionTitle}
              </Typography.Caption1>
            </TouchableOpacity>
          </BalanceMemberRow>
        ))}
      </View>

      {hiddenMembers.length > 0 && (
        <TouchableOpacity style={styles.hiddenMembersContainer} onPress={onShowAllPress}>
          <AvatarsStack.Labeled
            renderLabel={(label, props) => (
              <Typography.Caption1 color='primary' disablePadding {...props} weight='semiBold'>
                {label}
              </Typography.Caption1>
            )}
            borderColor={theme.gradients.neutral.solid}
            images={hiddenMembers}
            label={`Show ${hiddenMembers.length} more`}
          />
        </TouchableOpacity>
      )}
    </Banner>
  );
};

BannerBalanceMembers.displayName = 'BannerBalanceMembers';

const bannerBalanceMembersStylesheet = createStyleSheet((theme) => ({
  contentContainer: {
    paddingHorizontal: theme.margins.base,
    paddingVertical: theme.margins.base,
  },
  balanceMembersRowsContainer: {
    rowGap: theme.margins.base,
    width: '100%',
  },
  hiddenMembersContainer: {
    marginTop: theme.margins.md,
  },
}));

export interface BalanceMemberRowProps extends Stylable {}

const BalanceMemberRow = ({
  containerStyle,
  children,
}: PropsWithChildren<BalanceMemberRowProps>) => {
  const { styles } = useStyles(balanceMemberRowStylesheet);

  return <View style={[styles.container, containerStyle]}>{children}</View>;
};

BalanceMemberRow.displayName = 'BalanceMemberRow';

const balanceMemberRowStylesheet = createStyleSheet((theme) => ({
  container: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: theme.margins.md,
  },
}));

export { BalanceMemberRow };

interface BalanceMemberChipProps extends Stylable {
  member: BalanceMember;
  variant: 'negative' | 'positive';
  onPress?: (member: BalanceMember) => void;
  balancesLimit?: number;
}

const BalanceMemberChip = ({
  member,
  variant,
  balancesLimit = 1,
  containerStyle,
  onPress,
}: BalanceMemberChipProps) => {
  const { styles } = useStyles(balanceMemberChipStylesheet);

  const visibleBalances = useMemo(
    () => member.balances.slice(0, Math.max(balancesLimit, 1)),
    [balancesLimit, member.balances]
  );
  const hiddenBalancesCount = member.balances.length - visibleBalances.length;

  const handlePress = useCallback(() => onPress?.(member), [member, onPress]);

  return (
    <View style={[styles.container, containerStyle]}>
      <Chip containerStyle={styles.chip} balanceRight interactive onPress={handlePress}>
        <ChipAvatar displayName={member.displayName} imageUri={member.imageUri} />

        <ChipText containerStyle={styles.nameText} ellipsizeMode='middle' numberOfLines={1}>
          {member.displayName}
        </ChipText>

        <View style={styles.balanceBadgesContainer}>
          {visibleBalances.map((balance) => (
            <BalanceChip
              key={`balance-chip:${balance.currency.code}:${balance.value}`}
              background={
                (
                  {
                    negative: 'gradient-negative',
                    positive: 'gradient-positive',
                  } satisfies Record<BalanceMemberChipProps['variant'], Background>
                )[variant]
              }
              balance={balance}
              containerStyle={styles.balanceChipContainer}
            />
          ))}

          {hiddenBalancesCount > 0 && (
            <ChipTextSm color='secondary'>{`+${hiddenBalancesCount}`}</ChipTextSm>
          )}
        </View>
      </Chip>
    </View>
  );
};

BalanceMemberChip.displayName = 'BalanceMemberChip';

const balanceMemberChipStylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  chip: {
    backgroundColor: theme.colors.background,
    flexGrow: 0,
    alignSelf: 'flex-start',
  },
  balanceBadgesContainer: {
    flexDirection: 'row',
    columnGap: theme.margins.sm,
    alignItems: 'center',
  },
  balanceChipContainer: {
    flexShrink: 0,
  },
  nameText: {
    flexShrink: 1,
  },
}));

export interface BalanceChipProps extends ChipProps {
  balance: Balance;
}

const BalanceChip = ({ balance, background, ...rest }: BalanceChipProps) => {
  const { styles } = useStyles(balanceChipStylesheet);
  const formattedBalance = formatCurrency(balance.value, balance.currency.code, {
    includeSign: false,
  });

  return (
    <Chip background={background} size='sm' {...rest}>
      {background === 'gradient-negative' && (
        <LinearGradient.Negative containerStyle={styles.gradient} fill />
      )}
      {background === 'gradient-positive' && (
        <LinearGradient.Positive containerStyle={styles.gradient} fill />
      )}

      <ChipTextSm>{formattedBalance}</ChipTextSm>
    </Chip>
  );
};

BalanceChip.displayName = 'BalanceChip';

export { BalanceChip };

const balanceChipStylesheet = createStyleSheet((theme) => ({
  gradient: {
    borderRadius: theme.rounded.full,
  },
}));
