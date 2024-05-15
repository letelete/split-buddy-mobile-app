import { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';

import { Icon } from '~/ui:lib/atoms/icon';
import { Stylable } from '~/ui:lib/shared/interfaces';

import { NOT_IMPLEMENTED } from '~/utils/mock';

export interface ExpenseGroupSettingsButtonProps extends Stylable {}

const ExpenseGroupSettingsButton = ({ containerStyle }: ExpenseGroupSettingsButtonProps) => {
  const handleOpenExpenseGroupSettings = useCallback(() => {
    NOT_IMPLEMENTED();
  }, []);

  return (
    <TouchableOpacity style={containerStyle} onPress={handleOpenExpenseGroupSettings}>
      <Icon color='primary' name='ellipsis-horizontal-circle' />
    </TouchableOpacity>
  );
};

ExpenseGroupSettingsButton.displayName = 'ExpenseGroupSettingsButton';

export { ExpenseGroupSettingsButton };
