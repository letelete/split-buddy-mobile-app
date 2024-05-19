import { forwardRef } from 'react';
import {
  KeyboardAwareScrollView as NativeKeyboardAwareScrollView,
  KeyboardAwareScrollViewProps as NativeKeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';

/* -------------------------------------------------------------------------------------------------
 * KeyboardAwareScrollView
 * -----------------------------------------------------------------------------------------------*/

interface KeyboardAwareScrollViewProps extends NativeKeyboardAwareScrollViewProps {}

const KeyboardAwareScrollView = forwardRef<
  NativeKeyboardAwareScrollView,
  KeyboardAwareScrollViewProps
>(
  (
    {
      children,
      contentInsetAdjustmentBehavior = 'always',
      enableOnAndroid = true,
      enableResetScrollToCoords = false,
      extraHeight = 200,
      keyboardOpeningTime = 0,
      keyboardShouldPersistTaps = 'never',
      scrollEnabled = true,
      showsVerticalScrollIndicator = false,

      ...rest
    },
    ref
  ) => (
    <NativeKeyboardAwareScrollView
      {...rest}
      ref={ref}
      contentInsetAdjustmentBehavior={contentInsetAdjustmentBehavior}
      enableOnAndroid={enableOnAndroid}
      enableResetScrollToCoords={enableResetScrollToCoords}
      extraHeight={extraHeight}
      keyboardOpeningTime={keyboardOpeningTime}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      scrollEnabled={scrollEnabled}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
    >
      {children}
    </NativeKeyboardAwareScrollView>
  )
);

KeyboardAwareScrollView.displayName = 'KeyboardAwareScrollView';

/* -----------------------------------------------------------------------------------------------*/

export { KeyboardAwareScrollView };
export type { KeyboardAwareScrollViewProps };
