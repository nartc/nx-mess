import { createSelector } from '@ngrx/store';
import { createSlice, noopReducer, PayloadAction } from 'ngrx-slice';

export interface AuthState {
  isLoggedIn: boolean;
  user: import('@auth0/auth0-spa-js').User | null | undefined;
}

export type AuthUser = AuthState['user'];

export type NonNullAuthUser = NonNullable<AuthUser>;

export const initialAuthState: AuthState = {
  isLoggedIn: false,
  user: null,
};

export const {
  actions: AuthActions,
  selectors,
  ...AuthFeature
} = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login: {
      success: (state, action: PayloadAction<{ user: AuthUser }>) => {
        state.user = action.user;
        state.isLoggedIn = true;
      },
      trigger: noopReducer(),
    },
    logout: {
      success: (state) => void (state = initialAuthState),
      trigger: noopReducer(),
    },
    check: {
      success: (state, action: PayloadAction<{ user: AuthUser }>) => {
        state.user = action.user;
        state.isLoggedIn = !!action.user;
      },
      trigger: noopReducer(),
    },
  },
});

const selectUser = createSelector(
  selectors.selectAuthState,
  (authState) => authState.user as NonNullAuthUser
);

export const AuthSelectors = { selectUser };
