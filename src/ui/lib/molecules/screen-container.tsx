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
  paddingHorizontal?: boolean;
  scrollViewProps?: KeyboardAwareScrollViewProps;
  variant?: ContainerVariant;
  testID?: string;
  disableBottomPadding?: boolean;
  disableTopPadding?: boolean;
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
      paddingHorizontal = true,
      scrollViewProps,
      variant = 'default',
      testID,
      disableBottomPadding = false,
      disableTopPadding = true,
    },
    ref
  ) => {
    const { styles } = useStyles(stylesheet);

    const containerStyle_ = useMemo(
      () => [
        styles.container,
        !['fullscreen', 'scrollable-fullscreen'].includes(variant) && styles.safeAreaContainer,
        !['scrollable', 'scrollable-fullscreen'].includes(variant) &&
          styles.paddingHorizontal(paddingHorizontal),
        disableBottomPadding && styles.removePaddingBottom,
        disableTopPadding && styles.removePaddingTop,
        containerStyle,
      ],
      [styles, variant, paddingHorizontal, disableBottomPadding, disableTopPadding, containerStyle]
    );

    const scrollViewProps_ = useMemo(
      () =>
        ({
          showsVerticalScrollIndicator: false,
          contentContainerStyle: [
            styles.paddingHorizontal(paddingHorizontal),
            styles.scrollContent,
          ],
          ...scrollViewProps,
        }) satisfies KeyboardAwareScrollViewProps,
      [paddingHorizontal, scrollViewProps, styles]
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
  paddingHorizontal: (apply: boolean) => ({
    paddingLeft: apply ? theme.container.padding.horizontal : 0,
    paddingRight: apply ? theme.container.padding.horizontal : 0,
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
}));

ScreenContainerPrimitive.displayName = 'ScreenContainerPrimitive';

export interface FullWidthBoxProps extends Stylable {}

const FullWidthBox = ({ containerStyle, children }: PropsWithChildren<FullWidthBoxProps>) => {
  const { styles } = useStyles(fullWidthStylesheet);

  return <View style={[styles.fullWidthBox, containerStyle]}>{children}</View>;
};

const fullWidthStylesheet = createStyleSheet((theme, runtime) => ({
  fullWidthBox: {
    width: runtime.screen.width,
    left: -theme.container.padding.horizontal,
  },
}));

FullWidthBox.displayName = 'FullWidthBox';

export const ScreenContainer = Object.assign(ScreenContainerPrimitive, { FullWidthBox });
