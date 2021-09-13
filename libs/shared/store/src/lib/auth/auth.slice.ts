import { createSlice, noopReducer } from 'ngrx-slice';

export interface AuthState {
  isLoggedIn: boolean;
}

export const initialState: AuthState = {
  isLoggedIn: false,
};

export const {
  actions: AuthActions,
  name: authName,
  reducer: authReducer,
} = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: {
      success: (state) => {},
      trigger: noopReducer(),
    },
    logout: {
      success: (state) => {
        state = initialState;
      },
      trigger: noopReducer(),
    },
  },
});
