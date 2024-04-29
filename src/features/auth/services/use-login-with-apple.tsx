import { useMutation } from '@tanstack/react-query';
import * as AppleAuthentication from 'expo-apple-authentication';

import { AuthError, AuthTokenResponse, client } from '~/api/client';

export const useLoginWithApple = () => {
  const mutation = useMutation<AuthTokenResponse | null, Error>({
    mutationFn: async () => {
      try {
        const credential = await AppleAuthentication.signInAsync({
          requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            AppleAuthentication.AppleAuthenticationScope.EMAIL,
          ],
        });

        if (!credential.identityToken) {
          throw new Error('No identityToken.');
        }

        const response = await client.auth.signInWithIdToken({
          provider: 'apple',
          token: credential.identityToken,
        });

        return response;
      } catch (e) {
        if ((e as AuthError).code !== 'ERR_REQUEST_CANCELED') {
          throw e;
        }
      }
      return null;
    },
  });

  return mutation;
};
