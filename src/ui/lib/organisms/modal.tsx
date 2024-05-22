import {
  ComponentProps,
  ComponentType,
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Stylable } from '~/ui:lib/shared/interfaces';
import { StylesheetVariantsBoolean } from '~/ui:lib/shared/stylesheet';

import { NOT_IMPLEMENTED } from '~/utils/mock';

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
  animateInConfig: AnimateConfig;
  dismissible?: boolean;
  fullscreen?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ModalStackParamsList = Record<string, ComponentType<any>>;

type Props<
  TParamsList extends ModalStackParamsList,
  TName extends keyof TParamsList,
> = TParamsList[TName];

interface ModalContextProps<TParamsList extends ModalStackParamsList> {
  openModal<TName extends keyof TParamsList>(
    name: TName,
    props: Props<TParamsList, TName>,
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
}

const ModalProvider = <TParamsList extends ModalStackParamsList>({
  stack,
  children,
}: PropsWithChildren<ModalProviderProps<TParamsList>>) => {
  const modalController = useModalController(stack);

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

      <ModalStack stack={modalController.modalsStack} />
    </ModalContext.Provider>
  );
};

ModalProvider.displayName = 'ModalProvider';

/* -----------------------------------------------------------------------------------------------*/

const useModalController = <TParamsList extends ModalStackParamsList>(renderers: TParamsList) => {
  const [modalsStack, setModalsStack] = useState<ModalStackItem<TParamsList, keyof TParamsList>[]>(
    []
  );

  const openModal: ModalContextProps<TParamsList>['openModal'] = useCallback(
    (name, props, userConfig) => {
      const modalConfig = {
        namespace: undefined,
        animateInConfig: {
          animation: 'slide-in-down',
        },
        dismissible: true,
        ...userConfig,
      } satisfies ModalConfig;
      setModalsStack((stack) => [
        ...stack,
        {
          config: modalConfig,
          name,
          props,
          renderer: renderers[name],
        },
      ]);
    },
    []
  );

  const closeModal: ModalContextProps<TParamsList>['closeModal'] = useCallback(() => {
    NOT_IMPLEMENTED();
  }, []);

  const closeAllModals: ModalContextProps<TParamsList>['closeAllModals'] = useCallback(() => {
    NOT_IMPLEMENTED();
  }, []);

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
  props: TParamsList[TName];
  config: ModalConfig;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderer: ComponentProps<any>;
}

interface ModalStackProps<
  TParamsList extends ModalStackParamsList,
  TName extends keyof TParamsList,
> {
  stack: ModalStackItem<TParamsList, TName>[];
}

const ModalStack = <TParamsList extends ModalStackParamsList, TName extends keyof TParamsList>({
  stack,
}: ModalStackProps<TParamsList, TName>) => {
  const { styles } = useStyles(modalStackStylesheet);

  const modals = useMemo(() => {
    if (stack.length === 0) {
      return null;
    }

    const top = stack.at(-1);
    const fullscreens = stack
      .slice(0, stack.length - 1)
      .map((item) => (item.config.fullscreen ? item : null));

    const modals = [...fullscreens, top].filter(
      (item): item is ModalStackItem<TParamsList, TName> => Boolean(item)
    );

    return modals.length ? modals : null;
  }, [stack]);

  if (!modals?.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.backdrop} />

      <View style={styles.contentContainer}>
        {modals.map((modal, index) => (
          <ModalStackItemRenderer
            key={modal.name.toString()}
            containerStyle={styles.stackItem(index)}
            modal={modal}
          />
        ))}
      </View>
    </View>
  );
};

ModalStack.displayName = 'ModalStack';

const modalStackStylesheet = createStyleSheet((theme) => ({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  backdrop: {
    zIndex: 0,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.background,
    opacity: 0.5,
  },
  contentContainer: {
    zIndex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  stackItem: (index: number) => ({
    zIndex: 2 + index,
  }),
}));

/* -----------------------------------------------------------------------------------------------*/

interface ModalStackItemProps<
  TParamsList extends ModalStackParamsList,
  TName extends keyof TParamsList,
> extends Stylable {
  modal: ModalStackItem<TParamsList, TName>;
}

const ModalStackItemRenderer = <
  TParamsList extends ModalStackParamsList,
  TName extends keyof TParamsList,
>({
  modal,
  containerStyle,
}: ModalStackItemProps<TParamsList, TName>) => {
  const { styles } = useStyles(modalStackItemRendererStylesheet, {
    fullscreen: modal.config.fullscreen,
  });
  const Component = modal.renderer;

  return (
    <View style={[styles.container, containerStyle]}>
      <Component {...modal.props} />
    </View>
  );
};

ModalStackItemRenderer.displayName = 'ModalStackItemRenderer';

const modalStackItemRendererStylesheet = createStyleSheet((theme, runtime) => ({
  container: {
    borderRadius: theme.rounded.xl,
    overflow: 'hidden',
    variants: {
      fullscreen: {
        true: {
          paddingBottom: runtime.insets.bottom,
          paddingLeft: runtime.insets.left,
          paddingRight: runtime.insets.right,
          paddingTop: runtime.insets.right,
        },
        false: {
          marginBottom: runtime.insets.bottom + theme.margins.lg,
          marginLeft: runtime.insets.left + theme.margins.lg,
          marginRight: runtime.insets.right + theme.margins.lg,
          marginTop: runtime.insets.right + theme.margins.lg,
        },
      } satisfies StylesheetVariantsBoolean,
    },
  },
}));

/* -----------------------------------------------------------------------------------------------*/

export { ModalContext, ModalProvider };
export type { EnteringAnimation, ExitingAnimation, AnimateConfig, ModalConfig, ModalProviderProps };
