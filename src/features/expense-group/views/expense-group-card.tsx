import { useCallback } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { UserBalance } from '~/api/types';

import { useGradientForBalance } from '~/ui:hooks/use-color-for-balance';

import { BorderGradient } from '~/ui:lib/atoms/border-gradient';
import { LinearGradient } from '~/ui:lib/atoms/gradient';
import { Icon } from '~/ui:lib/atoms/icon';
import { BalanceSummary, BalanceSummarySettledUp } from '~/ui:lib/molecules/balance-summary';
import { AvatarsStack } from '~/ui:lib/molecules/labeled-avatars-stack';
import { Typography } from '~/ui:lib/molecules/typography';
import { BackgroundAwareContextProvider } from '~/ui:lib/shared/background-aware/providers';
import { Stylable } from '~/ui:lib/shared/interfaces';

export interface ExpenseGroupMember {
  id: string;
  displayName: string;
  imageUri?: string;
}

export interface ExpenseGroupCardProps extends Stylable {
  name: string;
  members: ExpenseGroupMember[];
  userBalance: UserBalance;
  onPress?: () => void;
}

const ExpenseGroupCard = ({
  name,
  members,
  userBalance,
  onPress,
  containerStyle,
}: ExpenseGroupCardProps) => {
  const { styles, theme } = useStyles(stylesheet);

  const GradientForBalance = useGradientForBalance(userBalance.total);

  const hasBorrowed = userBalance.borrowed.length > 0;
  const hasLent = userBalance.lent.length > 0;
  const isSettleUp = !hasBorrowed && !hasLent;

  const renderBorderGradient = useCallback(
    (style: StyleProp<ViewStyle>) => <GradientForBalance containerStyle={style} fill />,
    [GradientForBalance]
  );

  return (
    <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress}>
      <BorderGradient
        borderRadius={theme.rounded.base}
        borderWidth={{ left: 2 }}
        renderGradient={renderBorderGradient}
      >
        <View>
          <LinearGradient.Neutral containerStyle={styles.gradient} fill />
          <BackgroundAwareContextProvider value={{ background: 'gradient-neutral' }}>
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <AvatarsStack.Labeled
                  borderColor={theme.traits.avatar.borderColor.onCard}
                  containerStyle={styles.avatarsStack}
                  images={members}
                  label={name}
                  labelContainerStyle={styles.avatarsStackLabelContainer}
                />

                <View style={styles.balanceSummary}>
                  {hasBorrowed && (
                    <View>
                      <Typography.Body color='secondary' paddingBottom={theme.margins.sm}>
                        You borrowed
                      </Typography.Body>
                      <BalanceSummary balances={userBalance.borrowed} showSign='none' />
                    </View>
                  )}

                  {hasLent && (
                    <View>
                      <Typography.Body color='secondary' paddingBottom={theme.margins.sm}>
                        You lent
                      </Typography.Body>
                      <BalanceSummary balances={userBalance.lent} showSign='none' />
                    </View>
                  )}

                  {isSettleUp && (
                    <Typography.Body color='secondary'>
                      You&apos;re all set! <BalanceSummarySettledUp inline />
                    </Typography.Body>
                  )}
                </View>
              </View>

              <Icon name='chevron-forward' size='sm' />
            </View>
          </BackgroundAwareContextProvider>
        </View>
      </BorderGradient>
    </TouchableOpacity>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    borderRadius: theme.rounded.base,
  },
  card: {
    padding: theme.margins.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    rowGap: theme.margins.lg,
    flex: 1,
  },
  avatarsStack: {
    marginLeft: -theme.margins.sm,
  },
  avatarsStackLabelContainer: {
    flex: 1,
  },
  gradient: {
    borderTopStartRadius: theme.rounded.baseInner,
    borderBottomStartRadius: theme.rounded.baseInner,
    borderTopEndRadius: theme.rounded.base,
    borderBottomEndRadius: theme.rounded.base,
  },
  balanceSummary: {
    rowGap: theme.margins.base,
  },
}));

ExpenseGroupCard.displayName = 'ExpenseGroupCard';

export { ExpenseGroupCard };
