import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ComponentType,
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  StyleProp,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import Animated, {
  AnimatedProps,
  AnimatedStyle,
  ComplexAnimationBuilder,
  FadeInDown,
  FadeOutDown,
  LinearTransition,
  SlideInDown,
  SlideOutDown,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { SpringConfig } from 'react-native-reanimated/lib/typescript/reanimated2/animation/springUtils';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Icon } from '~/ui:lib/atoms/icon';
import { Stylable } from '~/ui:lib/shared/interfaces';
import { StylesheetVariantsBoolean } from '~/ui:lib/shared/stylesheet';

/* -------------------------------------------------------------------------------------------------
 * Modal Provider
 * -----------------------------------------------------------------------------------------------*/

type EnteringAnimation = 'slide-in-down' | 'fade-zoom-in';
type ExitingAnimation = 'slide-out-down' | 'fade-zoom-out';

interface AnimateConfig {
  animation: EnteringAnimation | ExitingAnimation;
}

interface ModalConfig {
  namespace?: string;
  dismissible?: boolean;
  fullscreen?: boolean;
}

interface ModalStackConfig {
  backdropOpacity: number;
  backdropBackgroundColor: string;
  renderBackdrop: ((style: AnimatedStyle<StyleProp<ViewStyle>>) => ReactNode) | null;
}

interface ModalControllerConfig {
  onOpen: (<TName>(name: TName, modelsCount: number) => void) | null;
  onClose: (<TName>(name: TName, modelsRemainingCount: number) => void) | null;
  onCloseAll: (() => void) | null;
}

interface ModalProviderConfig extends Partial<ModalStackConfig>, Partial<ModalControllerConfig> {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ModalStackParamsList = Record<string, ComponentType<any>>;

interface ModalContextProps<TParamsList extends ModalStackParamsList> {
  openModal<TName extends keyof TParamsList>(
    name: TName,
    props?: ComponentPropsWithoutRef<TParamsList[TName]>,
    config?: ModalConfig
  ): void;
  closeModal<TName extends keyof TParamsList>(name: TName): void;
  closeAllModals(): void;
}

const createModalContext = <TParamsList extends ModalStackParamsList>() => {
  const ModalContext = createContext<ModalContextProps<TParamsList> | null>(null);
  ModalContext.displayName = 'Modal';

  return ModalContext;
};

const ModalContext = createModalContext();

interface ModalProviderProps<TParamsList extends ModalStackParamsList> {
  stack: TParamsList;
  config?: ModalProviderConfig;
}

const ModalProvider = <TParamsList extends ModalStackParamsList>({
  stack,
  config: userConfig,
  children,
}: PropsWithChildren<ModalProviderProps<TParamsList>>) => {
  const config = useMemo(
    () =>
      ({
        backdropOpacity: 0.666,
        backdropBackgroundColor: '#000',
        renderBackdrop: null,
        onOpen: null,
        onClose: null,
        onCloseAll: null,
        ...userConfig,
      }) satisfies ModalProviderConfig,
    [userConfig]
  );

  const modalController = useModalController(stack, config);

  const modalContextValue = useMemo<ModalContextProps<TParamsList>>(
    () => ({
      openModal: modalController.openModal,
      closeModal: modalController.closeModal,
      closeAllModals: modalController.closeAllModals,
    }),
    [modalController.closeAllModals, modalController.closeModal, modalController.openModal]
  );

  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}

      <ModalStack config={config} stack={modalController.modalsStack} />
    </ModalContext.Provider>
  );
};

ModalProvider.displayName = 'ModalProvider';

/* -----------------------------------------------------------------------------------------------*/

const useModalController = <TParamsList extends ModalStackParamsList>(
  renderers: TParamsList,
  config: ModalControllerConfig
) => {
  const [modalsStack, setModalsStack] = useState<ModalStackItem<TParamsList, keyof TParamsList>[]>(
    []
  );

  const openModal: ModalContextProps<TParamsList>['openModal'] = useCallback(
    (name, props, userModalConfig) => {
      const modalConfig = {
        namespace: undefined,
        dismissible: true,
        ...userModalConfig,
      } satisfies ModalConfig;

      const modal = {
        config: modalConfig,
        name,
        props,
        renderer: renderers[name],
      } satisfies ModalStackItem<TParamsList, keyof TParamsList>;

      setModalsStack((stack) => {
        const newModalsStack = [
          ...stack.filter((stackItem) => stackItem.name !== modal.name),
          modal,
        ];

        config.onOpen?.(name, newModalsStack.length);

        return newModalsStack;
      });
    },
    [config, renderers]
  );

  const closeModal: ModalContextProps<TParamsList>['closeModal'] = useCallback(
    (name) => {
      setModalsStack((modals) => {
        const remainingStack = modals.filter((modal) => modal.name !== name);

        config.onClose?.(name, remainingStack.length);

        return remainingStack;
      });
    },
    [config]
  );

  const closeAllModals: ModalContextProps<TParamsList>['closeAllModals'] = useCallback(() => {
    setModalsStack([]);

    config.onCloseAll?.();
  }, [config]);

  return { openModal, closeModal, closeAllModals, modalsStack };
};

/* -------------------------------------------------------------------------------------------------
 * ModelStack
 * -----------------------------------------------------------------------------------------------*/

interface ModalStackItem<
  TParamsList extends ModalStackParamsList,
  TName extends keyof TParamsList,
> {
  name: TName;
  props?: ComponentPropsWithoutRef<TParamsList[TName]>;
  config: ModalConfig;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderer: ComponentProps<any>;
}

interface ModalStackProps<
  TParamsList extends ModalStackParamsList,
  TName extends keyof TParamsList,
> {
  stack: ModalStackItem<TParamsList, TName>[];
  config: ModalStackConfig;
}

const ModalStack = <TParamsList extends ModalStackParamsList, TName extends keyof TParamsList>({
  stack,
  config,
}: ModalStackProps<TParamsList, TName>) => {
  const context = useContext(ModalContext) as ModalContextProps<TParamsList> | null;
  if (!context) {
    throw new Error('ModalStack must be a descendant of the ModalContext provider');
  }

  const { styles } = useStyles(modalStackStylesheet);

  const modals = useMemo(() => {
    if (stack.length === 0) {
      return null;
    }

    const top = stack.at(-1);
    const firstFullscreenBehindTop = stack
      .slice(0, stack.length - 1)
      .find((item) => item.config.fullscreen);
    const isTopFullscreen = top?.config?.fullscreen;

    const modals = [isTopFullscreen ? null : firstFullscreenBehindTop, top].filter(
      (item): item is ModalStackItem<TParamsList, TName> => Boolean(item)
    );

    return modals.length ? modals : null;
  }, [stack]);

  const animationController = useModalStackAnimationController({
    modalsLength: modals?.length ?? 0,
  });

  const handleBackdropPress = useCallback(() => {
    const top = modals?.at(-1);
    if (top) {
      if (top.config.dismissible) {
        context.closeModal(top.name);
      }
    } else {
      context.closeAllModals();
    }
  }, [context, modals]);

  return animationController.canShowStack ? (
    <Animated.View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <Animated.View style={styles.backdropContainer(config.backdropOpacity)}>
          {config.renderBackdrop?.(animationController.backdropAnimatedStyle) ?? (
            <Animated.View
              style={[
                styles.backdrop(config.backdropBackgroundColor),
                animationController.backdropAnimatedStyle,
              ]}
            />
          )}
        </Animated.View>
      </TouchableWithoutFeedback>

      {modals?.map((modal, index) => (
        <ModalStackItemRenderer
          key={modal.name.toString()}
          containerStyle={styles.stackItem(index)}
          entering={animationController.modalEnteringAnimation}
          exiting={animationController.modalExitingAnimation}
          modal={modal}
        />
      ))}
    </Animated.View>
  ) : null;
};

ModalStack.displayName = 'ModalStack';

const fillContainerStyles = {
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
} as const;
const modalStackStylesheet = createStyleSheet((theme) => ({
  container: {
    zIndex: 1,
    ...fillContainerStyles,
  },
  backdropContainer: (opacity: number) => ({
    zIndex: 1,
    opacity,
    ...fillContainerStyles,
  }),
  backdrop: (backgroundColor: string) => ({
    backgroundColor,
    width: '100%',
    height: '100%',
  }),
  stackItem: (index: number) => ({
    zIndex: 1 + index,
  }),
}));

/* -----------------------------------------------------------------------------------------------*/

const backdropAnimationConfig = {
  damping: 10,
  mass: 0.1,
  stiffness: 128,
  velocity: 1,
} satisfies SpringConfig;

const withModalEntryAnimationBuilder = (builder: ComplexAnimationBuilder) => {
  return builder.damping(10).mass(0.25).stiffness(100).restDisplacementThreshold(0.1);
};

const withModalExitAnimationBuilder = (builder: ComplexAnimationBuilder) => {
  return builder.damping(10).mass(0.25).stiffness(100).restDisplacementThreshold(0.1);
};

interface UseModalStackAnimationControllerProps {
  modalsLength: number;
}

const useModalStackAnimationController = (props: UseModalStackAnimationControllerProps) => {
  const [stackStatus, setStackStatus] = useState<'idle' | 'shown' | 'hiding' | 'hidden'>('idle');

  const canShowStack = stackStatus === 'hiding' || stackStatus === 'shown';

  const backdropOpacity = useSharedValue(0);
  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const isBackdropVisible = useSharedValue(false);
  const isSomeModalVisible = useSharedValue(false);

  const modalEnteringAnimation = withModalEntryAnimationBuilder(SlideInDown.springify());
  const modalExitingAnimation = withModalExitAnimationBuilder(
    SlideOutDown.springify().withCallback((finished) => {
      if (finished && props.modalsLength <= 1) {
        isSomeModalVisible.value = false;
      }
    })
  );

  useDerivedValue(() => {
    if (!isSomeModalVisible.value && !isBackdropVisible.value && stackStatus === 'hiding') {
      runOnJS(setStackStatus)('hidden');
    }
  });

  const showBackdrop = useCallback(() => {
    backdropOpacity.value = withSpring(1, backdropAnimationConfig);
  }, [backdropOpacity]);

  const hideBackdrop = useCallback(() => {
    backdropOpacity.value = withSpring(0, backdropAnimationConfig, (finished) => {
      if (finished) {
        isBackdropVisible.value = false;
      }
    });
  }, [backdropOpacity, isBackdropVisible]);

  useEffect(() => {
    if (props.modalsLength) {
      runOnJS(setStackStatus)('shown');
      isSomeModalVisible.value = true;
      isBackdropVisible.value = true;
      showBackdrop();
    } else {
      runOnJS(setStackStatus)('hiding');
      hideBackdrop();
    }
  }, [hideBackdrop, isSomeModalVisible, isBackdropVisible, props.modalsLength, showBackdrop]);

  return {
    canShowStack,
    backdropAnimatedStyle,
    modalEnteringAnimation,
    modalExitingAnimation,
    showBackdrop,
    hideBackdrop,
    setStackStatus,
  };
};

/* -------------------------------------------------------------------------------------------------
 * ModalStackItem
 * -----------------------------------------------------------------------------------------------*/

const TRANSITION_DURATION = 150;

interface ModalStackItemProps<
  TParamsList extends ModalStackParamsList,
  TName extends keyof TParamsList,
> extends Pick<AnimatedProps<ViewProps>, 'entering' | 'exiting'>,
    Stylable {
  modal: ModalStackItem<TParamsList, TName>;
}

const ModalStackItemRenderer = <
  TParamsList extends ModalStackParamsList,
  TName extends keyof TParamsList,
>({
  modal,
  containerStyle,
  entering,
  exiting,
}: ModalStackItemProps<TParamsList, TName>) => {
  const fullscreen = modal.config.fullscreen ?? false;

  const { styles, theme } = useStyles(modalStackItemRendererStylesheet, { fullscreen });
  const Component = modal.renderer;

  const animatedContainerStyle = useAnimatedStyle(() => ({
    borderRadius: withDelay(
      fullscreen ? 0 : TRANSITION_DURATION * 0.8,
      withTiming(fullscreen ? 0 : theme.rounded.xl, { duration: TRANSITION_DURATION * 0.2 })
    ),
  }));

  return (
    <Animated.View
      entering={entering}
      exiting={exiting}
      layout={LinearTransition.springify(TRANSITION_DURATION)}
      style={[styles.container, animatedContainerStyle, containerStyle]}
    >
      {modal.config.fullscreen && (
        <Animated.View entering={FadeInDown} exiting={FadeOutDown} style={styles.handleContainer}>
          <ModalHandle />
        </Animated.View>
      )}

      <Component key={modal.name.toString()} {...modal.props} />
    </Animated.View>
  );
};

ModalStackItemRenderer.displayName = 'ModalStackItemRenderer';

const modalStackItemRendererStylesheet = createStyleSheet((theme, runtime) => ({
  handleContainer: {
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    left: 0,
    top: runtime.insets.top,
    right: 0,
  },
  container: {
    overflow: 'hidden',
    backgroundColor: theme.colors.background,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: theme.colors.typography.decorative,
    variants: {
      fullscreen: {
        true: {
          top: -1,
          left: -1,
          bottom: -1,
          right: -1,
          paddingBottom: runtime.insets.bottom + 1,
          paddingLeft: runtime.insets.left + 1,
          paddingRight: runtime.insets.right + 1,
          paddingTop: runtime.insets.top + 1,
          maxHeight: runtime.screen.height + 1,
        },
        false: {
          marginBottom: runtime.insets.bottom + theme.margins.base,
          marginLeft: runtime.insets.left + theme.margins.md,
          marginRight: runtime.insets.right + theme.margins.md,
          marginTop: runtime.insets.top + theme.margins.base,
          maxHeight:
            runtime.screen.height -
            (runtime.insets.top + theme.margins.base + runtime.insets.bottom + theme.margins.base),
        },
      } satisfies StylesheetVariantsBoolean,
    },
  },
}));

/* -------------------------------------------------------------------------------------------------
 * Modal Components
 * -----------------------------------------------------------------------------------------------*/

interface ModalHandleProps extends Stylable {}

const ModalHandle = ({ containerStyle }: ModalHandleProps) => {
  const { styles } = useStyles(modalHandleStylesheet);

  return <View style={[styles.container, containerStyle]} />;
};

ModalHandle.displayName = 'ModalHandle';

const modalHandleStylesheet = createStyleSheet((theme) => ({
  container: {
    borderRadius: theme.rounded.full,
    backgroundColor: theme.colors.typography.decorative,
    height: 6,
    width: 40,
  },
}));

/* -----------------------------------------------------------------------------------------------*/

interface ModalHeaderProps extends Stylable {
  disablePaddingBottom?: boolean;
}

const ModalHeader = ({
  disablePaddingBottom,
  containerStyle,
  children,
}: PropsWithChildren<ModalHeaderProps>) => {
  const { styles } = useStyles(modalHeaderStylesheet);

  return (
    <View style={[styles.container, !disablePaddingBottom && styles.paddingBottom, containerStyle]}>
      {children}
    </View>
  );
};

ModalHeader.displayName = 'ModalHeader';

const modalHeaderStylesheet = createStyleSheet((theme) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paddingBottom: {
    paddingBottom: theme.margins.xl,
  },
}));

/* -----------------------------------------------------------------------------------------------*/

interface ModalCloseButtonProps extends Stylable {
  disabled?: boolean;
  onPress?: () => void;
}

const ModalCloseButton = ({ disabled, containerStyle, onPress }: ModalCloseButtonProps) => {
  const { styles } = useStyles(modalCloseButtonStylesheet);

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.container, containerStyle]}
      onPress={onPress}
    >
      <Icon color={disabled ? 'disabled' : 'primary'} name='close' size='xs' />
    </TouchableOpacity>
  );
};

ModalCloseButton.displayName = 'ModalCloseButton';

const modalCloseButtonStylesheet = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.typography.decorative,
    borderRadius: theme.rounded.full,
    padding: theme.margins.base,
    alignSelf: 'flex-start',
  },
}));

/* -----------------------------------------------------------------------------------------------*/

export { ModalContext, ModalProvider, ModalHandle, ModalHeader, ModalCloseButton };
export type {
  EnteringAnimation,
  ExitingAnimation,
  AnimateConfig,
  ModalConfig,
  ModalStackParamsList,
  ModalProviderProps,
  ModalContextProps,
  ModalProviderConfig,
  ModalHandleProps,
  ModalHeaderProps,
  ModalCloseButtonProps,
};
