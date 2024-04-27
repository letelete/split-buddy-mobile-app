import { withLenses } from '@dhmk/zustand-lens';
import { create } from 'zustand';

import { authSlice } from '~/features/auth/store/auth-store';

export const useAppStore = create(
  withLenses({
    auth: authSlice,
  })
);
