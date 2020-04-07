import { createAction, props, Action } from '@ngrx/store';

export const REGISTER_START = '[Auth] Register Start';
export const LOGIN_START = '[Auth] Login Start';
export const LOGOUT_START = '[Auth] Logout Start';
export const LOGOUT_END = '[Auth] Logout End';
export const AUTH_SUCCESS = '[Auth] Auth Success';
export const AUTH_FAIL = '[Auth] Auth Fail';
export const CLEAR_ERROR = '[Auth] Clear Error';

export class RegisterStart implements Action {
  readonly type = REGISTER_START;

  constructor(
    public payload: { username: string; email: string; password: string }
  ) {}
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { username: string; password: string }) {}
}

export class AuthSuccess implements Action {
  readonly type = AUTH_SUCCESS;

  constructor(
    public payload: {
      id: number;
      username: string;
      accessToken: string;
      refreshToken: string;
      tokenExpirationDate: Date;
    }
  ) {}
}

export class LogoutStart implements Action {
  readonly type = LOGOUT_START;

  constructor(public payload: string) {}
}

export class LogoutEnd implements Action {
  readonly type = LOGOUT_END;
}

export class AuthFail implements Action {
  readonly type = AUTH_FAIL;

  constructor(public payload: string) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type AuthActions =
  | RegisterStart
  | LoginStart
  | AuthSuccess
  | LogoutStart
  | AuthFail
  | ClearError
  | LogoutEnd;
