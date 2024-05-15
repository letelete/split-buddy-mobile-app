import { PropsWithChildren, useCallback } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

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
  onPress?: () => void;
}

const Chip = ({
  size = 'base',
  background = 'chip-translucent',
  interactive,
  disabled,
  children,
  containerStyle,
  onPress,
}: PropsWithChildren<ChipProps>) => {
  const { styles } = useStyles(stylesheet, {
    size,
  });

  const containerStyles = [styles.container, containerStyle];

  const renderChip = useCallback(
    (style?: StyleProp<ViewStyle>) => <View style={style}>{children}</View>,
    [children]
  );

  if (!interactive) {
    return renderChip(containerStyles);
  }

  return (
    <TouchableOpacity disabled={disabled} style={containerStyles} onPress={onPress}>
      <BackgroundAwareContextProvider value={{ background }}>
        {renderChip()}
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
    variants: {
      size: {
        sm: {
          paddingVertical: theme.margins.sm,
          paddingHorizontal: theme.margins.sm,
        },
        base: {
          paddingVertical: theme.margins.base,
          paddingHorizontal: theme.margins.md,
        },
        default: {
          paddingVertical: theme.margins.sm,
          paddingHorizontal: theme.margins.base,
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
