import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Balance } from '~/api/types';

import { Emoji } from '~/ui:lib/atoms/emoji';
import { Text, TextProps } from '~/ui:lib/atoms/text';
import { Stylable } from '~/ui:lib/shared/interfaces';

import { formatCurrency } from '~/utils/string';

/* -------------------------------------------------------------------------------------------------
 * BalanceSummary
 * -----------------------------------------------------------------------------------------------*/

type Size = 'primary' | 'secondary' | 'tertiary';

type Sign = 'all' | 'plus' | 'minus' | 'none';

interface BalanceSummaryProps extends Stylable {
  balances: Balance[];
  centered?: boolean;
  baseSize?: Size;
  showSign?: Sign;
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
  balances,
  centered = false,
  baseSize = 'primary',
  showSign = 'all',
  containerStyle,
}: BalanceSummaryProps) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={[styles.container(centered), containerStyle]}>
      {balances.map((balance, index) => {
        const includeSign =
          showSign === 'all' ||
          (showSign === 'plus' && balance.value < 0) ||
          (showSign === 'minus' && balance.value > 0);
        const formattedBalance = formatCurrency(balance.value, balance.currency.code, {
          includeSign,
        });

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

BalanceSummary.displayName = 'BalanceSummary';

const stylesheet = createStyleSheet((theme) => ({
  container: (centered: boolean) => ({
    rowGap: theme.margins.sm,
    alignItems: centered ? 'center' : 'flex-start',
  }),
}));

/* -------------------------------------------------------------------------------------------------
 * BalanceSummarySettledUp
 * -----------------------------------------------------------------------------------------------*/

interface BalanceSummarySettledUpProps extends Stylable {
  size?: Size;
  inline?: boolean;
}

const BalanceSummarySettledUp = ({ size = 'primary', inline }: BalanceSummarySettledUpProps) => {
  return (
    <Text size={inline ? undefined : textSize(size)}>
      <Emoji name='partying-face' />
    </Text>
  );
};

BalanceSummarySettledUp.displayName = 'BalanceSummarySettledUp';

/* -----------------------------------------------------------------------------------------------*/

export { BalanceSummary, BalanceSummarySettledUp };
export type { Size, Sign, BalanceSummaryProps, BalanceSummarySettledUpProps };
