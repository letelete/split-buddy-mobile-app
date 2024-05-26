import { View } from 'react-native';

import { UserBalance } from '~/api/types';

import { Typography } from '~/ui:lib/molecules/typography';

import { formatCurrency } from '~/utils/string';

export interface HomeBalanceModalProps {
  userBalance: UserBalance;
  balanceSourcesCount: number;
}

const HomeBalanceModal = ({ userBalance, balanceSourcesCount }: HomeBalanceModalProps) => {
  return (
    <View style={{ padding: 24 }}>
      <Typography.LargeTitle paddingBottom={16}>Your total balance</Typography.LargeTitle>
      <Typography.Body color='secondary' paddingBottom={48}>
        {balanceSourcesCount > 1
          ? `In all ${balanceSourcesCount} groups combined`
          : 'In all your groups combined'}
      </Typography.Body>

      {userBalance.total.map((e) => (
        <Typography.Body key={e.currency.code}>
          {formatCurrency(e.value, e.currency.code)}
        </Typography.Body>
      ))}
    </View>
  );
};

HomeBalanceModal.displayName = 'HomeBalanceModal';

export { HomeBalanceModal };
