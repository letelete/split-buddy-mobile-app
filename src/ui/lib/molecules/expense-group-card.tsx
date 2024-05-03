import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

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

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <LinearGradient.Neutral containerStyle={styles.gradient} fill />

      <View style={styles.card}>
        <View style={styles.cardContent}>
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
                <Typography.Body
                  color='secondary'
                  size={hasBorrowed ? 'sm' : 'base'}
                  disablePadding
                >
                  You lent
                </Typography.Body>
                <BalanceSummary balances={lent} baseSize={hasBorrowed ? 'secondary' : 'primary'} />
              </View>
            )}
          </View>

          <AvatarsStack.Labeled
            borderColor={theme.traits.userAvatar.borderColor.onCard}
            images={members}
            label={name}
          />
        </View>

        <Ionicons color={theme.colors.typography.primary} name='chevron-forward' size={24} />
      </View>
    </TouchableOpacity>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  card: {
    borderRadius: theme.rounded.base,
    padding: theme.margins.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    rowGap: theme.margins.lg,
  },
  gradient: {
    borderRadius: theme.rounded.base,
  },
  balanceSummary: {
    rowGap: theme.margins.base,
  },
}));

ExpenseGroupCard.displayName = 'ExpenseGroupCard';

export { ExpenseGroupCard };
