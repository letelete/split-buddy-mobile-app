import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text, TextProps } from '~/ui:lib/atoms/text';
import { Stylable } from '~/ui:lib/shared/interfaces';

import { formatCurrency } from '~/utils/string';
import { Balance } from '~/utils/types';

export type Size = 'primary' | 'secondary';

export interface BalanceSummaryProps extends Stylable {
  balances: Balance[];
  centered?: boolean;
}

const textSize = (size: 'primary' | 'secondary') =>
  (
    ({
      primary: 'lg',
      secondary: 'md',
    }) satisfies Record<Size, TextProps['size']>
  )[size];

const BalanceSummary = ({ centered = false, balances, containerStyle }: BalanceSummaryProps) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={[styles.container(centered), containerStyle]}>
      {balances.map((balance, index) => {
        const formattedBalance = formatCurrency(balance.value, balance.currency.code);

        return (
          <Text
            key={formattedBalance}
            color='primary'
            size={textSize(index === 0 ? 'primary' : 'secondary')}
            weight='bold'
          >
            {formattedBalance}
          </Text>
        );
      })}
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: (centered: boolean) => ({
    rowGap: theme.margins.md,
    alignItems: centered ? 'center' : 'flex-start',
  }),
}));

BalanceSummary.displayName = 'BalanceSummary';

export { BalanceSummary };
