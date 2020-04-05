import { createReducer, on, Action } from '@ngrx/store';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  isLoading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  isLoading: false
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.register, AuthActions.login, (state) => ({
    ...state,
    isLoading: false,
    authError: null
  })),
  on(AuthActions.authSuccess, (state, { payload }) => ({
    ...state,
    user: new User(
      payload.id,
      payload.username,
      payload.accessToken,
      payload.tokenExpirationDate,
      payload.refreshToken
    ),
    isLoading: false,
    authError: null
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null
  })),
  on(AuthActions.authFail, (state, { payload }) => ({
    ...state,
    authError: payload
  })),
  on(AuthActions.clearError, (state) => ({
    ...state,
    authError: null
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
