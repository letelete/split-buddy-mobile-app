import Ionicons from '@expo/vector-icons/Ionicons';
import { ComponentPropsWithoutRef, useContext } from 'react';
import { TextStyle } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import {
  BackgroundAwareContext,
  backgroundAwareStylesheet,
} from '~/ui:lib/shared/background-aware';
import { Stylable } from '~/ui:lib/shared/interfaces';
import { StylesheetVariants } from '~/ui:lib/shared/stylesheet';

import { AppTheme } from '~/ui:styles/themes';

/* -------------------------------------------------------------------------------------------------
 * Icon
 * -----------------------------------------------------------------------------------------------*/

type Color = keyof AppTheme['colors']['typography'];

type Size = 'base' | 'sm' | 'xs';

interface IconProps extends Stylable<TextStyle> {
  name: ComponentPropsWithoutRef<typeof Ionicons>['name'];
  size?: Size;
  color?: Color;
  testID?: string;
}

const Icon = ({ name, containerStyle, color, size, testID = 'Icon' }: IconProps) => {
  const backgroundAwareContext = useContext(BackgroundAwareContext);
  const { styles: backgroundAwareStyles } = useStyles(backgroundAwareStylesheet);
  const { styles } = useStyles(stylesheet, { size });

  const iconColorValue = backgroundAwareStyles.backgroundAwareForeground(
    backgroundAwareContext.background,
    color
  ).color;

  const iconSizeValue = styles.container.fontSize;

  return (
    <Ionicons
      color={iconColorValue}
      name={name}
      size={iconSizeValue}
      style={containerStyle}
      testID={testID}
    />
  );
};

Icon.displayName = 'Icon';

const stylesheet = createStyleSheet(() => ({
  container: {
    variants: {
      size: {
        xs: { fontSize: 17 },
        sm: { fontSize: 24 },
        base: { fontSize: 28 },
        default: { fontSize: 28 },
      } satisfies StylesheetVariants<Size>,
    },
  },
}));

/* -----------------------------------------------------------------------------------------------*/

export { Icon };
export type { Color, Size, IconProps };
