import { PropsWithChildren, createContext } from 'react';

import { Background } from '~/ui:lib/shared/background-aware/stylesheets';

export interface BackgroundAwareContextProps {
  /**
   * A background on which the foreground is rendered on. Defaults to theme's background color.
   */
  background: Background;
}

export const BackgroundAwareContext = createContext<BackgroundAwareContextProps>({
  background: 'base',
});

export interface BackgroundAwareContextProviderProps {
  value?: BackgroundAwareContextProps;
}

export const BackgroundAwareContextProvider = ({
  children,
  value,
}: PropsWithChildren<BackgroundAwareContextProviderProps>) => (
  <BackgroundAwareContext.Provider
    value={{
      ...value,
      background: value?.background ?? 'base',
    }}
  >
    {children}
  </BackgroundAwareContext.Provider>
);
