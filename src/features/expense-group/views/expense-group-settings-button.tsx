import { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';

import { Icon } from '~/ui:lib/atoms/icon';
import { Stylable } from '~/ui:lib/shared/interfaces';

export interface ExpenseGroupSettingsButtonProps extends Stylable {}

const ExpenseGroupSettingsButton = ({ containerStyle }: ExpenseGroupSettingsButtonProps) => {
  const handleOpenExpenseGroupSettings = useCallback(() => {
    console.warn('Not implemented');
  }, []);

  return (
    <TouchableOpacity style={containerStyle} onPress={handleOpenExpenseGroupSettings}>
      <Icon color='primary' name='ellipsis-horizontal-circle' />
    </TouchableOpacity>
  );
};

ExpenseGroupSettingsButton.displayName = 'ExpenseGroupSettingsButton';

export { ExpenseGroupSettingsButton };
