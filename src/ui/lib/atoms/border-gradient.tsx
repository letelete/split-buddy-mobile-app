import { PropsWithChildren, ReactNode, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { AtLeastOne } from '~/utils/types';

type EdgeSizing =
  | number
  | AtLeastOne<{ left?: number; top?: number; right?: number; bottom?: number }>;

export interface BorderGradientProps {
  renderGradient: (style: StyleProp<ViewStyle>) => ReactNode;
  borderWidth: EdgeSizing;
  borderRadius: number;
}

const BorderGradient = ({
  borderWidth,
  renderGradient,
  borderRadius,
  children,
}: PropsWithChildren<BorderGradientProps>) => {
  const { styles } = useStyles(stylesheet);
  const [[gradientWidth, gradientHeight], setGradientSize] = useState([0, 0]);

  return (
    <View>
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
        ? { margin: borderWidth }
        : {
            marginLeft: borderWidth.left,
            marginTop: borderWidth.top,
            marginRight: borderWidth.right,
            marginBottom: borderWidth.bottom,
          }),
    },
  }),
}));

BorderGradient.displayName = 'BorderGradient';

export { BorderGradient };
