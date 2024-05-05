import Ionicons from '@expo/vector-icons/Ionicons';
import { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { Stylable } from '~/ui:lib/shared/interfaces';

export interface NotificationsButtonProps extends Stylable {}

// TODO: query notifications
const NotificationsButton = ({ containerStyle }: NotificationsButtonProps) => {
  const { theme } = useStyles();

  const handleOpenNotifications = useCallback(() => {
    console.warn('Not implemented');
  }, []);

  return (
    <TouchableOpacity style={containerStyle} onPress={handleOpenNotifications}>
      <Ionicons
        color={theme.colors.typography.primary}
        name='notifications-outline'
        size={theme.traits.appHeader.action.size}
      />
    </TouchableOpacity>
  );
};

NotificationsButton.displayName = 'NotificationsButton';

export { NotificationsButton };
