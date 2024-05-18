import { PropsWithChildren } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Avatar, AvatarProps } from '~/ui:lib/atoms/avatar';
import { Caption1Props, Caption2Props, Typography } from '~/ui:lib/molecules/typography';
import { BackgroundAwareContextProvider } from '~/ui:lib/shared/background-aware/providers';
import { Background } from '~/ui:lib/shared/background-aware/stylesheets';
import { Stylable } from '~/ui:lib/shared/interfaces';
import { StylesheetVariants } from '~/ui:lib/shared/stylesheet';

export type Size = 'base' | 'sm';

export interface ChipProps extends Stylable {
  size?: Size;
  interactive?: boolean;
  disabled?: boolean;
  background?: Background;
  balanceLeft?: boolean;
  balanceRight?: boolean;
  onPress?: () => void;
}

const Chip = ({
  size = 'base',
  background = 'chip-translucent',
  interactive,
  disabled,
  children,
  containerStyle,
  balanceLeft,
  balanceRight,
  onPress,
}: PropsWithChildren<ChipProps>) => {
  const { styles } = useStyles(stylesheet, {
    size,
  });
  const { styles: balanceStyles } = useStyles(balanceStylesheet, {
    size,
  });

  const containerStyles = [
    styles.container,
    balanceLeft && balanceStyles.left,
    balanceRight && balanceStyles.right,
    containerStyle,
  ] as StyleProp<ViewStyle>;

  if (!interactive) {
    return <View style={containerStyles}>{children}</View>;
  }

  return (
    <TouchableOpacity disabled={disabled} style={containerStyles} onPress={onPress}>
      <BackgroundAwareContextProvider value={{ background }}>
        {children}
      </BackgroundAwareContextProvider>
    </TouchableOpacity>
  );
};

Chip.displayName = 'Chip';

export { Chip };

const stylesheet = createStyleSheet((theme) => ({
  container: {
    borderRadius: theme.rounded.full,
    backgroundColor: theme.colors.chipTranslucent.background,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    variants: {
      size: {
        sm: {
          paddingVertical: theme.margins.sm,
          paddingHorizontal: theme.margins.sm,
          columnGap: theme.margins.sm,
        },
        base: {
          paddingVertical: theme.margins.sm,
          paddingHorizontal: theme.margins.base,
          columnGap: theme.margins.base,
        },
        get default() {
          return this.base;
        },
      } satisfies StylesheetVariants<Size>,
    },
  },
}));

const balanceStylesheet = createStyleSheet((theme) => ({
  left: {
    variants: {
      size: {
        sm: { paddingLeft: theme.margins.xs },
        base: { paddingLeft: theme.margins.sm },
        get default() {
          return this.base;
        },
      } satisfies StylesheetVariants<Size>,
    },
  },
  right: {
    variants: {
      size: {
        sm: { paddingRight: theme.margins.xs },
        base: { paddingRight: theme.margins.sm },
        get default() {
          return this.base;
        },
      } satisfies StylesheetVariants<Size>,
    },
  },
}));

export interface ChipTextProps extends Caption1Props {}

const ChipText = ({ children, ...rest }: PropsWithChildren<ChipTextProps>) => {
  return (
    <Typography.Caption1 color='primary' disablePadding {...rest}>
      {children}
    </Typography.Caption1>
  );
};

ChipText.displayName = 'ChipText';

export { ChipText };

export interface ChipTextSmProps extends Caption2Props {}

const ChipTextSm = ({ children, ...rest }: PropsWithChildren<ChipTextSmProps>) => {
  return (
    <Typography.Caption2 color='primary' disablePadding {...rest}>
      {children}
    </Typography.Caption2>
  );
};

ChipTextSm.displayName = 'ChipTextSm';

export { ChipTextSm };

export type ChipAvatarProps = AvatarProps;

const ChipAvatar = ({ ...rest }: ChipAvatarProps) => {
  return <Avatar size='xs' {...rest} />;
};

ChipAvatar.displayName = 'ChipAvatar';

export { ChipAvatar };
