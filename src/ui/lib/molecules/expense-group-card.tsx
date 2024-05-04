import Ionicons from '@expo/vector-icons/Ionicons';
import { useCallback } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { BorderGradient } from '~/ui:lib/atoms/border-gradient';
import { LinearGradient } from '~/ui:lib/atoms/gradient';
import { BalanceSummary } from '~/ui:lib/molecules/balance-total-summary';
import { AvatarsStack } from '~/ui:lib/molecules/labeled-avatars-stack';
import { Typography } from '~/ui:lib/molecules/typography';
import { Stylable } from '~/ui:lib/shared/interfaces';

import { Balance } from '~/utils/types';

export interface ExpenseGroupMember {
  id: string;
  displayName: string;
  imageUri?: string;
}

export interface ExpenseGroupCardProps extends Stylable {
  name: string;
  members: ExpenseGroupMember[];
  borrowed?: Balance[];
  lent?: Balance[];
  onPress?: () => void;
}

const ExpenseGroupCard = ({
  name,
  members,
  borrowed,
  lent,
  onPress,
  containerStyle,
}: ExpenseGroupCardProps) => {
  const { styles, theme } = useStyles(stylesheet);

  const hasBorrowed = borrowed && borrowed.length > 0;
  const hasLent = lent && lent.length > 0;

  const renderBorderGradient = useCallback(
    (style: StyleProp<ViewStyle>) => {
      if (hasBorrowed) {
        return <LinearGradient.Negative containerStyle={style} fill />;
      }
      if (hasLent) {
        return <LinearGradient.Positive containerStyle={style} fill />;
      }

      return <LinearGradient.Neutral containerStyle={style} fill />;
    },
    [hasBorrowed, hasLent]
  );

  return (
    <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress}>
      <BorderGradient
        borderRadius={theme.rounded.base}
        borderWidth={{ left: 2 }}
        renderGradient={renderBorderGradient}
      >
        <LinearGradient.Neutral containerStyle={styles.gradient} fill />

        <View style={styles.card}>
          <View style={styles.cardContent}>
            <AvatarsStack.Labeled
              borderColor={theme.traits.userAvatar.borderColor.onCard}
              images={members}
              label={name}
            />

            <View style={styles.balanceSummary}>
              {hasBorrowed && (
                <View>
                  <Typography.Body color='secondary' disablePadding>
                    You borrowed
                  </Typography.Body>
                  <BalanceSummary balances={borrowed} />
                </View>
              )}

              {hasLent && (
                <View>
                  <Typography.Body color='secondary' disablePadding>
                    You lent
                  </Typography.Body>
                  <BalanceSummary balances={lent} />
                </View>
              )}
            </View>
          </View>

          <Ionicons color={theme.colors.typography.primary} name='chevron-forward' size={24} />
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
