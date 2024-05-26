import { useCallback } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';

import { UserBalance } from '~/api/types';

import { Typography } from '~/ui:lib/molecules/typography';
import { ModalCloseButton, ModalHeader } from '~/ui:lib/organisms/modal';
import { useAppModalContext } from '~/ui:lib/widgets/app-modal/hooks/use-app-modal-context';

import { formatCurrency } from '~/utils/string';

export interface HomeBalanceModalProps {
  userBalance: UserBalance;
  balanceSourcesCount: number;
}

const HomeBalanceModal = ({ userBalance, balanceSourcesCount }: HomeBalanceModalProps) => {
  const appModalContext = useAppModalContext();

  return (
    <Animated.View sharedTransitionTag='home-balance-modal' style={{ padding: 24 }}>
      <ModalHeader>
        <Typography.LargeTitle disablePadding>Your total balance</Typography.LargeTitle>

        <ModalCloseButton onPress={() => appModalContext.closeModal('home:balance')} />
      </ModalHeader>

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

      <TouchableOpacity
        onPress={() =>
          appModalContext.openModal(
            'home:balance',
            { balanceSourcesCount, userBalance },
            { fullscreen: true }
          )
        }
      >
        <Typography.Body>Fullscreen</Typography.Body>
      </TouchableOpacity>
    </Animated.View>
  );
};

HomeBalanceModal.displayName = 'HomeBalanceModal';

export { HomeBalanceModal };
