import { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';

import { Icon } from '~/ui:lib/atoms/icon';
import { Stylable } from '~/ui:lib/shared/interfaces';

export interface NotificationsButtonProps extends Stylable {}

// TODO: query notifications
const NotificationsButton = ({ containerStyle }: NotificationsButtonProps) => {
  const handleOpenNotifications = useCallback(() => {
    console.warn('Not implemented');
  }, []);

  return (
    <TouchableOpacity style={containerStyle} onPress={handleOpenNotifications}>
      <Icon color='primary' name='notifications-outline' />
    </TouchableOpacity>
  );
};

NotificationsButton.displayName = 'NotificationsButton';

export { NotificationsButton };
