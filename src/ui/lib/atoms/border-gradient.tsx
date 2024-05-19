import { PropsWithChildren, ReactNode, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Stylable } from '~/ui:lib/shared/interfaces';

import { AtLeastOne } from '~/utils/types';

/* -------------------------------------------------------------------------------------------------
 * BorderGradient
 * -----------------------------------------------------------------------------------------------*/

type EdgeSizing =
  | number
  | AtLeastOne<{ left?: number; top?: number; right?: number; bottom?: number }>;

interface BorderGradientProps extends Stylable {
  renderGradient: (style: StyleProp<ViewStyle>) => ReactNode;
  borderWidth: EdgeSizing;
  borderRadius: number;
}

const BorderGradient = ({
  borderWidth,
  renderGradient,
  borderRadius,
  children,
  containerStyle,
}: PropsWithChildren<BorderGradientProps>) => {
  const { styles } = useStyles(stylesheet);
  const [[gradientWidth, gradientHeight], setGradientSize] = useState([0, 0]);

  return (
    <View style={containerStyle}>
      {renderGradient(styles.gradient(gradientHeight, gradientWidth, borderRadius))}

      <View
        style={styles.innerContainer(borderWidth, borderRadius)}
        onLayout={(event) => {
          const { layout } = event.nativeEvent;
          setGradientSize([layout.width, layout.height]);
        }}
      >
        {children}
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(() => ({
  gradient: (height: number, width: number, borderRadius: number) => ({
    height,
    width,
    borderRadius,
  }),
  innerContainer: (borderWidth: EdgeSizing, borderRadius) => ({
    borderRadius,
    ...{
      ...(typeof borderWidth === 'number'
        ? { padding: borderWidth }
        : {
            paddingLeft: borderWidth.left,
            paddingTop: borderWidth.top,
            paddingRight: borderWidth.right,
            paddingBottom: borderWidth.bottom,
          }),
    },
  }),
}));

BorderGradient.displayName = 'BorderGradient';

/* -----------------------------------------------------------------------------------------------*/

export { BorderGradient };
export type { BorderGradientProps };
