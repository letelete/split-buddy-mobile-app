import { TouchableOpacity, View, ViewProps } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Icon, IconProps } from '~/ui:lib/atoms/icon';
import { Typography } from '~/ui:lib/molecules/typography';
import { BackgroundAwareContextProvider } from '~/ui:lib/shared/background-aware';
import { Stylable } from '~/ui:lib/shared/interfaces';

/* -------------------------------------------------------------------------------------------------
const Toolbar = ({ items, containerStyle, ...rest }: ToolbarProps) => {
 * 
 * -----------------------------------------------------------------------------------------------*/

interface ToolbarProps extends Stylable, ViewProps {
  items: ToolbarEntryItem[];
}

const Toolbar = ({ items, containerStyle, ...rest }: ToolbarProps) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={[styles.container, containerStyle]} {...rest}>
      {items.map((item, idx) => (
        <ToolbarEntry
          key={`toolbar-item:${idx}`}
          containerStyle={items.length === 1 && styles.entryGrow}
          item={item}
        />
      ))}
    </View>
  );
};

Toolbar.displayName = 'Toolbar';

const stylesheet = createStyleSheet((theme, runtime) => ({
  container: {
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background,
    width: runtime.screen.width,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.container.padding.horizontal,
    paddingTop: theme.margins.md,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    paddingBottom: runtime.insets.bottom + theme.margins.sm,
  },
  entryGrow: {
    justifyContent: 'center',
    flex: 1,
  },
}));

/* -------------------------------------------------------------------------------------------------
 * ToolbarEntry
 * -----------------------------------------------------------------------------------------------*/

interface ToolbarEntryItem {
  icon?: IconProps['name'];
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
}

export interface ToolbarEntryProps extends Stylable {
  item: ToolbarEntryItem;
}

const ToolbarEntry = ({ item, containerStyle }: ToolbarEntryProps) => {
  const { styles } = useStyles(toolbarEntryStylesheet);

  return (
    <TouchableOpacity
      disabled={item.disabled}
      style={[styles.container, containerStyle]}
      onPress={item.onPress}
    >
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
    </TouchableOpacity>
  );
};

const toolbarEntryStylesheet = createStyleSheet((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: theme.margins.base,
  },
}));

ToolbarEntry.displayName = 'ToolbarEntry';

/* -----------------------------------------------------------------------------------------------*/

export { Toolbar, ToolbarEntry };
export type { ToolbarProps };
