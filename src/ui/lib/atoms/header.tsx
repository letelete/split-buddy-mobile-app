import { ReactNode } from 'react';
import { StyleProp, TextProps, TouchableOpacity, View, ViewProps, ViewStyle } from 'react-native';
import Animated, { AnimatedProps } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Icon, IconProps } from '~/ui:lib/atoms/icon';
import { BodyProps, Typography } from '~/ui:lib/molecules/typography';
import { BackgroundAwareContextProvider } from '~/ui:lib/shared/background-aware/providers';
import { Stylable } from '~/ui:lib/shared/interfaces';

export interface HeaderProps extends AnimatedProps<ViewProps>, Stylable {
  title: string | ReactNode;
  titleContainerStyle?: StyleProp<ViewStyle>;
  leftContainerStyle?: StyleProp<ViewStyle>;
  rightContainerStyle?: StyleProp<ViewStyle>;
  titleProps?: Partial<TextProps>;
  blur?: boolean;
  hasBack?: boolean;
  left?: ReactNode;
  right?: ReactNode;
  renderBack?: () => ReactNode;
}

const Header = ({
  title,
  titleContainerStyle,
  leftContainerStyle,
  rightContainerStyle,
  titleProps,
  blur,
  hasBack,
  left,
  right,
  children,
  containerStyle,
  renderBack,
  ...rest
}: HeaderProps) => {
  const { styles } = useStyles(stylesheet);

  return (
    <Animated.View {...rest} style={[styles.container, containerStyle]}>
      <BackgroundAwareContextProvider>
        <View style={[styles.itemsContainer, leftContainerStyle]}>
          {hasBack && (renderBack?.() ?? <HeaderBackButton />)}
          {left}
        </View>

        <View style={[styles.titleContainer, titleContainerStyle]}>
          {typeof title === 'string' ? (
            <Typography.Body
              containerStyle={styles.title}
              weight='bold'
              disablePadding
              {...titleProps}
            >
              {title}
            </Typography.Body>
          ) : (
            title
          )}
        </View>

        <View style={[styles.itemsContainer, rightContainerStyle]}>{right}</View>
      </BackgroundAwareContextProvider>
    </Animated.View>
  );
};

Header.displayName = 'Header';

export { Header };

const stylesheet = createStyleSheet((theme, runtime) => ({
  container: {
    flexDirection: 'row',
    paddingTop: runtime.insets.top,
    paddingHorizontal: theme.margins.md,
    paddingBottom: theme.margins.md,
    alignItems: 'center',
  },
  itemsContainer: {
    flexDirection: 'row',
    columnGap: theme.margins.base,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.margins.lg,
  },
  title: {
    textAlign: 'center',
  },
}));

export interface HeaderBackButtonProps extends Partial<HeaderButtonProps> {}

const HeaderBackButton = ({ ...rest }: HeaderBackButtonProps) => {
  return <HeaderButton icon='chevron-back' {...rest} />;
};

HeaderBackButton.displayName = 'HeaderBackButton';

export { HeaderBackButton };

export interface HeaderButtonProps extends Stylable {
  label?: ReactNode;
  labelProps?: BodyProps;
  icon?: IconProps['name'];
  iconProps?: Partial<IconProps>;
  disabled?: boolean;
  onPress?: () => void;
}

const HeaderButton = ({
  label,
  labelProps,
  icon,
  iconProps,
  disabled,
  containerStyle,
  onPress,
}: HeaderButtonProps) => {
  const { styles } = useStyles(headerButtonStylesheet);

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.container, containerStyle]}
      onPress={onPress}
    >
      {icon && <Icon name={icon} {...iconProps} color={disabled ? 'disabled' : 'primary'} />}
      {label && (
        <Typography.Body color={disabled ? 'disabled' : 'primary'} disablePadding {...labelProps}>
          {label}
        </Typography.Body>
      )}
    </TouchableOpacity>
  );
};

HeaderButton.displayName = 'HeaderButton';

export { HeaderButton };

const headerButtonStylesheet = createStyleSheet((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: theme.margins.sm,
  },
}));
