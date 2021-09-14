import { createSelector } from '@ngrx/store';
import { createSlice, noopReducer, PayloadAction } from 'ngrx-slice';

export interface AuthState {
  isLoggedIn: boolean;
  user: import('@auth0/auth0-spa-js').User | null | undefined;
}

export type AuthUser = AuthState['user'];

export const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

export const {
  actions: AuthActions,
  selectors,
  name: authName,
  reducer: authReducer,
} = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: {
      success: (state, action: PayloadAction<{ user: AuthUser }>) => {
        state.user = action.user;
        state.isLoggedIn = true;
      },
      trigger: noopReducer(),
    },
    logout: {
      success: (state) => {
        state = initialState;
      },
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
  (authState) => authState.user as NonNullable<AuthUser>
);

export const AuthSelectors = { selectUser };
