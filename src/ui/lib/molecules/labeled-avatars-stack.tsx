import { ReactNode, useMemo } from 'react';
import { StyleProp, TextProps, TextStyle, View, ViewStyle } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Avatar } from '~/ui:lib/atoms/avatar';
import { BodyProps, Typography } from '~/ui:lib/molecules/typography';
import { Stylable } from '~/ui:lib/shared/interfaces';

export interface AvatarsStackProps extends Stylable {
  images: { id: string; displayName: string; imageUri?: string }[];
  avatarsLimit?: number;
  borderColor?: string;
}

const AvatarsStackPrimitive = ({
  images,
  avatarsLimit = 3,
  borderColor,
  containerStyle,
}: AvatarsStackProps) => {
  const { styles, theme } = useStyles(avatarsStackStylesheet);

  const visibleAvatars = useMemo(() => images.slice(0, avatarsLimit), [avatarsLimit, images]);
  const hiddenAvatarsAmount = images.length - visibleAvatars.length;

  return (
    <View style={[styles.container, containerStyle]}>
      {visibleAvatars.map((item, index) => (
        <Avatar
          key={item.id}
          containerStyle={styles.avatar(borderColor ?? theme.colors.background, index)}
          displayName={item.displayName}
          imageUri={item.imageUri}
          size='sm'
        />
      ))}

      {hiddenAvatarsAmount > 0 && (
        <Typography.Caption2 disablePadding>+{hiddenAvatarsAmount}</Typography.Caption2>
      )}
    </View>
  );
};

const avatarsStackStylesheet = createStyleSheet((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: (borderColor: string, index: number) => ({
    borderWidth: 2,
    borderColor,
    marginLeft: index > 0 ? -8 : 0,
  }),
}));

AvatarsStackPrimitive.displayName = 'AvatarsStackPrimitive';

export interface LabeledAvatarsStackProps extends AvatarsStackProps {
  label: string;
  labelContainerStyle?: StyleProp<TextStyle>;
  avatarsStackStyle?: StyleProp<ViewStyle>;
  renderLabel?: (label: string, props: Partial<BodyProps>) => ReactNode;
}

const LabeledAvatarsStack = ({
  label,
  labelContainerStyle,
  avatarsStackStyle,
  containerStyle,
  renderLabel,
  ...rest
}: LabeledAvatarsStackProps) => {
  const { styles } = useStyles(labeledAvatarsStackStylesheet);

  const labelProps = {
    containerStyle: labelContainerStyle,
    ellipsizeMode: 'tail',
    numberOfLines: 1,
    weight: 'bold',
    disablePadding: true,
  } satisfies BodyProps;

  return (
    <View style={[styles.container, containerStyle]}>
      <AvatarsStack containerStyle={avatarsStackStyle} {...rest} />

      {renderLabel?.(label, labelProps) ?? (
        <Typography.Body {...labelProps}>{label}</Typography.Body>
      )}
    </View>
  );
};

const labeledAvatarsStackStylesheet = createStyleSheet((theme) => ({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: theme.margins.base,
  },
}));

LabeledAvatarsStack.displayName = 'LabeledAvatarsStack';

export const AvatarsStack = Object.assign(AvatarsStackPrimitive, { Labeled: LabeledAvatarsStack });
