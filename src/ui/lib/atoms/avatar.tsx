import { useMemo } from 'react';
import { Image, ImageStyle, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { LinearGradient } from '~/ui:lib/atoms/gradient';
import { Typography } from '~/ui:lib/molecules/typography';
import { BackgroundAwareContextProvider } from '~/ui:lib/shared/background-aware';
import { Stylable } from '~/ui:lib/shared/interfaces';

/* -------------------------------------------------------------------------------------------------
 * Avatar
 * -----------------------------------------------------------------------------------------------*/

type Size = 'base' | 'sm' | 'xs';

interface BaseAvatarProps {
  displayName: string;
  size?: Size;
}
interface InitialsAvatarProps extends BaseAvatarProps, Stylable {
  imageUri?: string;
}
interface ImageAvatarProps extends BaseAvatarProps, Stylable<ImageStyle> {
  imageUri: string;
}
type AvatarProps = InitialsAvatarProps | ImageAvatarProps;

const isImageAvatar = (props: AvatarProps): props is ImageAvatarProps => {
  return props.imageUri !== undefined;
};

const Avatar = (props: AvatarProps) => {
  const { styles } = useStyles(stylesheet);

  const avatarSize = useMemo(
    () =>
      (
        ({
          xs: 18,
          sm: 24,
          base: 28,
        }) satisfies Record<Size, number>
      )[props.size ?? 'base'],
    [props.size]
  );

  const title = useMemo(
    () =>
      props.displayName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.toUpperCase()[0])
        .join(''),
    [props.displayName]
  );

  if (isImageAvatar(props)) {
    return (
      <Image
        source={{ uri: props.imageUri }}
        style={[styles.avatarStyle(avatarSize), props.containerStyle]}
      />
    );
  }

  return (
    <View style={[styles.avatarStyle(avatarSize), props.containerStyle]}>
      <LinearGradient.IOS containerStyle={styles.background} direction='vertical' fill />

      <BackgroundAwareContextProvider value={{ background: 'gradient-ios' }}>
        <Typography.Caption2
          color='primary'
          containerStyle={styles.letters(avatarSize)}
          weight='bold'
          disablePadding
        >
          {title}
        </Typography.Caption2>
      </BackgroundAwareContextProvider>
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  background: {
    borderRadius: theme.rounded.full,
  },
  letters: (avatarSize: number) => ({
    fontSize: avatarSize / 2.4,
    textAlign: 'center',
  }),
  avatarStyle: (avatarSize: number) => ({
    width: avatarSize,
    height: avatarSize,
    borderRadius: theme.rounded.full,
    alignItems: 'center',
    justifyContent: 'center',
  }),
}));

Avatar.displayName = 'Avatar';

/* -----------------------------------------------------------------------------------------------*/

export { Avatar };
export type { AvatarProps, Size };
