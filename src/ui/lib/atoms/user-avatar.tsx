import { Avatar } from '@rneui/base';
import { useMemo } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Stylable } from '~/ui:lib/shared/interfaces';

export type Size = 'base' | 'sm';

export interface UserAvatarProps extends Stylable {
  imageUri?: string;
  displayName: string;
  size?: Size;
}

const UserAvatar = ({ imageUri, displayName, size = 'base', containerStyle }: UserAvatarProps) => {
  const { styles } = useStyles(stylesheet);

  const avatarSize = useMemo(
    () =>
      (
        ({
          base: 36,
          sm: 24,
        }) satisfies Record<Size, number>
      )[size],
    [size]
  );

  const title = useMemo(
    () =>
      displayName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.toUpperCase()[0])
        .join(''),
    [displayName]
  );

  return (
    <Avatar
      containerStyle={[styles.container, containerStyle]}
      size={avatarSize}
      source={imageUri ? { uri: imageUri } : undefined}
      title={imageUri ? undefined : title}
      rounded
    />
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.traits.userAvatar.background,
  },
  title: {
    color: theme.traits.userAvatar.title,
  },
}));

UserAvatar.displayName = 'UserAvatar';

export { UserAvatar };
