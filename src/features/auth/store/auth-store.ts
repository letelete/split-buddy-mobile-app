import { Lens, lens } from '@dhmk/zustand-lens';

export interface AuthState {
  userToken: string | null;
  userSignedOut: boolean;
  isLoggingIn: boolean;
}

interface AuthActions {
  initLogin: () => void;
  login: (userToken: string) => void;
  logout: () => void;
}

export interface AuthSlice extends AuthState {
  actions: AuthActions;
}

const initialState = {
  userToken: null,
  userSignedOut: false,
  isLoggingIn: false,
} as const satisfies AuthState;

const createAuthSlice: Lens<AuthSlice> = (set) => ({
  ...initialState,

  actions: {
    initLogin: () => {
      set({ isLoggingIn: true });
    },
    login: (userToken) => {
      set({ userToken, userSignedOut: false, isLoggingIn: false });
    },
    logout: () => {
      set(initialState);
    },
  },
});

export const authSlice = lens(createAuthSlice);
