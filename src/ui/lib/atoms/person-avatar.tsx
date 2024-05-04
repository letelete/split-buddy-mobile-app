import { Avatar } from '@rneui/base';
import { useMemo } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Stylable } from '~/ui:lib/shared/interfaces';

export type Size = 'base' | 'sm';

export interface PersonAvatarProps extends Stylable {
  imageUri?: string;
  displayName: string;
  size?: Size;
}

const PersonAvatar = ({
  imageUri,
  displayName,
  size = 'base',
  containerStyle,
}: PersonAvatarProps) => {
  const { styles } = useStyles(stylesheet);

  const avatarSize = useMemo(
    () =>
      (
        ({
          base: 28,
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
    backgroundColor: theme.traits.avatar.background,
  },
  title: {
    color: theme.traits.avatar.title,
  },
}));

PersonAvatar.displayName = 'PersonAvatar';

export { PersonAvatar };
