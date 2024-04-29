import { useCallback, useMemo, useState } from 'react';

import { useLoginWithApple } from '~/features/auth/services/use-login-with-apple';

export type LoginProvider = 'apple';

export const useLoginWithProvider = (provider: LoginProvider) => {
  const appleProvider = useLoginWithApple();

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = useMemo(
    () =>
      ({
        apple: appleProvider,
      })[provider],
    [appleProvider, provider]
  );

  const login = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await loginHandler.mutateAsync();
      if (response === null) {
        return;
      }
      if (response.error !== null) {
        throw response.error;
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [loginHandler]);

  return { login, isLoading, error };
};
