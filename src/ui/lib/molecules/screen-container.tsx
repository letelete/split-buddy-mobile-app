import React, { PropsWithChildren, useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from '~/ui:lib/atoms/keyboard-aware-scroll-view';
import { Stylable } from '~/ui:lib/shared/interfaces';

type ContainerVariant = 'default' | 'fullscreen' | 'scrollable' | 'scrollable-fullscreen';

export interface ScreenContainerPrimitiveProps extends Stylable {
  keyboardAwareScroll?: boolean;
  scrollViewProps?: KeyboardAwareScrollViewProps;
  variant?: ContainerVariant;
  testID?: string;
  disablePaddingTop?: boolean;
  disablePaddingBottom?: boolean;
  disablePaddingHorizontal?: boolean;
  disableHeader?: boolean;
  contentCentered?: boolean;
}

/**
 * Universal container for app screen
 *
 * @param variant
 * * `default` View with SafeAreaView margins on the top and bottom
 * * `fullscreen` View that covers whole screen, no SafeAreaView margins
 * * `scrollable` View that can be scrolled with SafeAreaView margins
 * * `scrollable-fullscreen` View that can be scrolled and covers whole screen
 */
const ScreenContainerPrimitive = React.forwardRef<
  View,
  PropsWithChildren<ScreenContainerPrimitiveProps>
>(
  (
    {
      children,
      containerStyle,
      keyboardAwareScroll = false,
      scrollViewProps,
      variant = 'default',
      testID,
      disablePaddingHorizontal = false,
      disablePaddingTop = false,
      disablePaddingBottom = false,
      contentCentered = false,
    },
    ref
  ) => {
    const { styles } = useStyles(stylesheet);

    const containerStyle_ = useMemo(
      () => [
        styles.container,
        !['fullscreen', 'scrollable-fullscreen'].includes(variant) && styles.safeAreaContainer,
        !['fullscreen', 'scrollable-fullscreen'].includes(variant) &&
          styles.paddingHorizontal(disablePaddingHorizontal),
        !['scrollable', 'scrollable-fullscreen'].includes(variant) &&
          disablePaddingTop &&
          styles.removePaddingBottom,
        disablePaddingBottom && styles.removePaddingTop,
        contentCentered && styles.contentCentered,
        containerStyle,
      ],
      [
        styles,
        variant,
        disablePaddingHorizontal,
        disablePaddingTop,
        disablePaddingBottom,
        contentCentered,
        containerStyle,
      ]
    );

    const scrollViewProps_ = useMemo(
      () =>
        ({
          showsVerticalScrollIndicator: false,
          contentContainerStyle: [
            styles.paddingHorizontal(disablePaddingHorizontal),
            styles.scrollContent,
          ],
          ...scrollViewProps,
        }) satisfies KeyboardAwareScrollViewProps,
      [disablePaddingHorizontal, scrollViewProps, styles]
    );

    const getContent = () => {
      if (!['scrollable', 'scrollable-fullscreen'].includes(variant)) {
        return children;
      }

      if (keyboardAwareScroll) {
        return (
          <KeyboardAwareScrollView testID='screen-container-scroll-view' {...scrollViewProps_}>
            {children}
          </KeyboardAwareScrollView>
        );
      }

      return (
        <ScrollView testID='screen-container-scroll-view' {...scrollViewProps_}>
          {children}
        </ScrollView>
      );
    };

    return (
      <View ref={ref} style={containerStyle_} testID={testID}>
        {getContent()}
      </View>
    );
  }
);

const stylesheet = createStyleSheet((theme, runtime) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  safeAreaContainer: {
    paddingTop: runtime.insets.top,
    paddingBottom: runtime.insets.bottom,
    paddingLeft: runtime.insets.left,
    paddingRight: runtime.insets.right,
  },
  paddingHorizontal: (disable: boolean) => ({
    paddingLeft: disable ? 0 : runtime.insets.left + theme.container.padding.horizontal,
    paddingRight: disable ? 0 : runtime.insets.right + theme.container.padding.horizontal,
  }),
  removePaddingTop: {
    paddingTop: 0,
  },
  removePaddingBottom: {
    paddingBottom: 0,
  },
  scrollContent: {
    minHeight: '100%',
  },
  contentCentered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

ScreenContainerPrimitive.displayName = 'ScreenContainerPrimitive';

export interface FullWidthBoxProps extends Stylable {}

const FullWidthBox = ({ containerStyle, children }: PropsWithChildren<FullWidthBoxProps>) => {
  const { styles } = useStyles(fullWidthStylesheet);

  return <View style={[styles.container, containerStyle]}>{children}</View>;
};

const fullWidthStylesheet = createStyleSheet((theme, runtime) => ({
  container: {
    width: runtime.screen.width,
    left: -theme.container.padding.horizontal,
  },
}));

FullWidthBox.displayName = 'FullWidthBox';

export interface HorizontalPaddingBoxProps extends Stylable {
  disablePaddingLeft?: boolean;
  disablePaddingRight?: boolean;
}

const HorizontalPaddingBox = ({
  disablePaddingLeft = false,
  disablePaddingRight = false,
  containerStyle,
  children,
}: PropsWithChildren<HorizontalPaddingBoxProps>) => {
  const { styles } = useStyles(horizontalPaddingBoxStylesheet);

  return (
    <View style={[styles.container(disablePaddingLeft, disablePaddingRight), containerStyle]}>
      {children}
    </View>
  );
};

const horizontalPaddingBoxStylesheet = createStyleSheet((theme, runtime) => ({
  container: (disablePaddingLeft: boolean, disablePaddingRight: boolean) => ({
    paddingLeft: disablePaddingLeft ? 0 : theme.container.padding.horizontal + runtime.insets.left,
    paddingRight: disablePaddingRight
      ? 0
      : theme.container.padding.horizontal + runtime.insets.right,
  }),
}));

HorizontalPaddingBox.displayName = 'HorizontalPaddingBox';

export const ScreenContainer = Object.assign(ScreenContainerPrimitive, {
  FullWidthBox,
  HorizontalPaddingBox,
});
