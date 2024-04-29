import { PropsWithChildren, createContext, useCallback, useEffect, useMemo, useState } from 'react';

import { Session, client } from '~/api/client';

export enum AuthState {
  CHECKING,
  NOT_AUTHORIZED,
  AUTHORIZED,
}

interface ContextProps {
  authState: AuthState;
  session: Session | null;
  userSignedOut: boolean;
}

const AuthContext = createContext<ContextProps>({
  authState: AuthState.CHECKING,
  session: null,
  userSignedOut: false,
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authState, setAuthState] = useState(AuthState.CHECKING);
  const [session, setSession] = useState<Session | null>(null);
  const [userSignedOut, setUserSignedOut] = useState(false);

  const [triggeredSessionRestoration, setTriggeredSessionRestoration] = useState(false);

  const handleSession = useCallback((session: Session | null) => {
    setAuthState((currentState) => {
      const userSignedOut = currentState === AuthState.AUTHORIZED && session === null;
      setUserSignedOut(userSignedOut);

      return session === null ? AuthState.NOT_AUTHORIZED : AuthState.AUTHORIZED;
    });

    setSession(session);
  }, []);

  useEffect(() => {
    const tryToRestoreSession = async () => {
      try {
        const sessionResponse = await client.auth.getSession();
        if (sessionResponse.error) {
          throw new Error(sessionResponse.error.message);
        }

        handleSession(session);
      } catch (error) {
        // silence
        console.error('Error when restoring session', error);
      }
    };

    const listenerResponse = client.auth.onAuthStateChange((_event, session) =>
      handleSession(session)
    );

    if (!triggeredSessionRestoration) {
      setTriggeredSessionRestoration(true);
      void tryToRestoreSession();
    }

    return () => {
      listenerResponse.data.subscription.unsubscribe();
    };
  }, [authState, session, handleSession, triggeredSessionRestoration]);

  const contextValue = useMemo(
    () => ({
      authState,
      session,
      userSignedOut,
    }),
    [authState, session, userSignedOut]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
