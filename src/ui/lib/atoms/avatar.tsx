import { Avatar as AvatarPrimitive } from '@rneui/base';
import { useMemo } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Stylable } from '~/ui:lib/shared/interfaces';

export type Size = 'base' | 'sm';

export interface AvatarProps extends Stylable {
  imageUri?: string;
  displayName: string;
  size?: Size;
}

const Avatar = ({ imageUri, displayName, size = 'base', containerStyle }: AvatarProps) => {
  const { styles, theme } = useStyles(stylesheet);

  const avatarSize = useMemo(
    () =>
      (
        ({
          base: theme.traits.appHeader.action.size,
          sm: 24,
        }) satisfies Record<Size, number>
      )[size],
    [size, theme.traits.appHeader.action.size]
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
    <AvatarPrimitive
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

Avatar.displayName = 'Avatar';

export { Avatar };
