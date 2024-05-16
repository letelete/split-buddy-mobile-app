import { PropsWithChildren, useCallback, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Balance, ExpenseGroup, UserBalance } from '~/api/types';

import { ExpenseGroupBalanceCarousel } from '~/features/expense-group/views/expense-group-balance-carousel';

import { Banner } from '~/ui:lib/atoms/banner';
import { Chip, ChipAvatar, ChipProps, ChipText, ChipTextSm } from '~/ui:lib/atoms/chip';
import { AvatarsStack } from '~/ui:lib/molecules/labeled-avatars-stack';
import { ScreenContainer } from '~/ui:lib/molecules/screen-container';
import { Typography } from '~/ui:lib/molecules/typography';
import { Background } from '~/ui:lib/shared/background-aware/stylesheets';
import { Stylable } from '~/ui:lib/shared/interfaces';

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

  const getBalancesForCarouselItem = useCallback((userBalance: UserBalance) => {
    return userBalance.borrowed;
  }, []);

  const variantForCarouselItem = useMemo<BannerBalanceMembersProps['variant']>(() => {
    return 'negative';
  }, []);

  const actionTitleForCarouselItem = useMemo(() => {
    return 'Settle up';
  }, []);

  const balanceMembers = useMemo(() => {
    return group.members.map(
      (member) =>
        ({
          id: member.id,
          displayName: member.displayName,
          imageUri: member.imageUrl,
          balances: getBalancesForCarouselItem(member.userBalance),
        }) satisfies BalanceMember
    );
  }, [getBalancesForCarouselItem, group.members]);

  return (
    <View style={containerStyle}>
      <ExpenseGroupBalanceCarousel group={group} userDisplayName={userDisplayName} />

      <ScreenContainer.HorizontalPaddingBox>
        {balanceMembers && (
          <BannerBalanceMembers
            actionTitle={actionTitleForCarouselItem}
            containerStyle={styles.membersContainer}
            members={balanceMembers}
            variant={variantForCarouselItem}
          />
        )}
      </ScreenContainer.HorizontalPaddingBox>
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
              <Typography.Caption1 color='primary' weight='semiBold'>
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
              <Typography.Caption1 {...props}>{label}</Typography.Caption1>
            )}
            borderColor={theme.colors.chipTranslucent.foreground.primary}
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
    paddingHorizontal: theme.margins.md,
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
    <Chip
      containerStyle={[styles.container, containerStyle]}
      balanceLeft
      balanceRight
      interactive
      onPress={handlePress}
    >
      <View style={styles.contentContainer}>
        <ChipAvatar displayName={member.displayName} imageUri={member.imageUri} />

        <ChipText>{member.displayName}</ChipText>

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
          />
        ))}

        {hiddenBalancesCount > 0 && (
          <ChipTextSm color='secondary'>{`+${hiddenBalancesCount}`}</ChipTextSm>
        )}
      </View>
    </Chip>
  );
};

BalanceMemberChip.displayName = 'BalanceMemberChip';

const balanceMemberChipStylesheet = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    columnGap: theme.margins.base,
  },
}));

export interface BalanceChipProps extends ChipProps {
  balance: Balance;
}

const BalanceChip = ({ balance, ...rest }: BalanceChipProps) => {
  const formattedBalance = formatCurrency(balance.value, balance.currency.code);

  return (
    <Chip size='sm' {...rest}>
      <ChipTextSm>{formattedBalance}</ChipTextSm>
    </Chip>
  );
};

BalanceChip.displayName = 'BalanceChip';

export { BalanceChip };
