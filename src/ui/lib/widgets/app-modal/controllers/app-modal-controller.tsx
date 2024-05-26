import { HomeBalanceModal } from '~/features/home/views/home-balance-modal';

import { ModalStackParamsList } from '~/ui:lib/organisms/modal';

export const appModalsStack = {
  'home:balance': HomeBalanceModal,
} as const satisfies ModalStackParamsList;

export type AppModalStack = typeof appModalsStack;
