import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Balance } from '~/api/types';

import { Text, TextProps } from '~/ui:lib/atoms/text';
import { Stylable } from '~/ui:lib/shared/interfaces';

import { formatCurrency } from '~/utils/string';

export type Size = 'primary' | 'secondary' | 'tertiary';

export interface BalanceSummaryProps extends Stylable {
  balances: Balance[];
  centered?: boolean;
  baseSize?: Size;
}

const textSize = (size: Size) =>
  (
    ({
      primary: 'lg',
      secondary: 'md',
      tertiary: 'sm',
    }) satisfies Record<Size, TextProps['size']>
  )[size];

const secondarySize = (baseSize: Size) => {
  return (
    {
      primary: 'secondary',
      secondary: 'tertiary',
      tertiary: 'tertiary',
    } satisfies Record<Size, Size>
  )[baseSize];
};

const BalanceSummary = ({
  centered = false,
  baseSize = 'primary',
  balances,
  containerStyle,
}: BalanceSummaryProps) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={[styles.container(centered), containerStyle]}>
      {balances.map((balance, index) => {
        const formattedBalance = formatCurrency(balance.value, balance.currency.code);

        return (
          <Text
            key={formattedBalance}
            color='primary'
            numberOfLines={1}
            size={textSize(index === 0 ? baseSize : secondarySize(baseSize))}
            weight='bold'
            adjustsFontSizeToFit
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
    rowGap: theme.margins.sm,
    alignItems: centered ? 'center' : 'flex-start',
  }),
}));

BalanceSummary.displayName = 'BalanceSummary';

export { BalanceSummary };
