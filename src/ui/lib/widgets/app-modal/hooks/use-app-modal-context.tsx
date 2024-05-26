import { useContext } from 'react';

import { ModalContext, ModalContextProps } from '~/ui:lib/organisms/modal';
import { AppModalStack } from '~/ui:lib/widgets/app-modal/controllers/app-modal-controller';

export const useAppModalContext = () => {
  const context = useContext(ModalContext) as ModalContextProps<AppModalStack>;

  return context;
};
