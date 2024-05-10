import { TouchableOpacity, View, ViewProps } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Icon, IconProps } from '~/ui:lib/atoms/icon';
import { Typography } from '~/ui:lib/molecules/typography';
import { BackgroundAwareContextProvider } from '~/ui:lib/shared/background-aware/providers';
import { Stylable } from '~/ui:lib/shared/interfaces';

export interface ToolbarProps extends Stylable, ViewProps {
  items: ToolbarItem[];
}

const Toolbar = ({ items, containerStyle, ...rest }: ToolbarProps) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={[styles.container, containerStyle]} {...rest}>
      {items.map((item, idx) => (
        <ToolbarEntry key={`toolbar-item:${idx}`} item={item} />
      ))}
    </View>
  );
};

Toolbar.displayName = 'Toolbar';

export { Toolbar };

const stylesheet = createStyleSheet((theme, runtime) => ({
  container: {
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background,
    width: runtime.screen.width,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.margins.md,
    paddingTop: theme.margins.base,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    paddingBottom: runtime.insets.bottom,
  },
}));

interface ToolbarItem {
  icon?: IconProps['name'];
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
}

export interface ToolbarEntryProps extends Stylable {
  item: ToolbarItem;
}

const ToolbarEntry = ({ item, containerStyle }: ToolbarEntryProps) => {
  const { styles } = useStyles(toolbarItemStylesheet);

  return (
    <TouchableOpacity disabled={item.disabled} onPress={item.onPress}>
      <View style={[styles.container, containerStyle]}>
        <BackgroundAwareContextProvider>
          {item.icon && <Icon color={item.disabled ? 'disabled' : 'primary'} name={item.icon} />}

          {item.title && (
            <Typography.Body
              color={item.disabled ? 'disabled' : 'primary'}
              weight={item.icon ? 'semiBold' : 'normal'}
              disablePadding
            >
              {item.title}
            </Typography.Body>
          )}
        </BackgroundAwareContextProvider>
      </View>
    </TouchableOpacity>
  );
};

const toolbarItemStylesheet = createStyleSheet((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: theme.margins.base,
  },
}));

ToolbarEntry.displayName = 'ToolbarEntry';

export { ToolbarEntry };
