import { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';

import { Icon } from '~/ui:lib/atoms/icon';
import { Stylable } from '~/ui:lib/shared/interfaces';

import { NOT_IMPLEMENTED } from '~/utils/mock';

/* -------------------------------------------------------------------------------------------------
 * NotificationsButton
 * -----------------------------------------------------------------------------------------------*/

interface NotificationsButtonProps extends Stylable {}

// TODO: query notifications
const NotificationsButton = ({ containerStyle }: NotificationsButtonProps) => {
  const handleOpenNotifications = useCallback(() => {
    NOT_IMPLEMENTED();
  }, []);

  return (
    <TouchableOpacity style={containerStyle} onPress={handleOpenNotifications}>
      <Icon color='primary' name='notifications-outline' />
    </TouchableOpacity>
  );
};

NotificationsButton.displayName = 'NotificationsButton';

/* -----------------------------------------------------------------------------------------------*/

export { NotificationsButton };
export type { NotificationsButtonProps };
