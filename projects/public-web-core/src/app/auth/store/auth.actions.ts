import { createAction, props } from '@ngrx/store';

export const register = createAction(
  '[Auth] register',
  props<{
    payload: {
      username: string;
      email: string;
      password: string;
    };
  }>()
);

export const login = createAction(
  '[Auth] Login',
  props<{
    payload: {
      username: string;
      password: string;
    };
  }>()
);

export const authSuccess = createAction(
  '[Auth] Auth Success',
  props<{
    payload: {
      id: number;
      username: string;
      accessToken: string;
      refreshToken: string;
      tokenExpirationDate: Date;
    };
  }>()
);

export const logout = createAction(
  '[Auth] Logout',
  props<{
    payload: {
      refreshToken: string;
    };
  }>()
);

export const authFail = createAction(
  '[Auth] Auth Fail',
  props<{ payload: string }>()
);

export const clearError = createAction('[Auth] Clear Error');
