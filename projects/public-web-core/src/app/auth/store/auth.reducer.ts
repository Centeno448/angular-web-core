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

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTH_SUCCESS:
      const user = new User(
        action.payload.id,
        action.payload.username,
        action.payload.accessToken,
        action.payload.tokenExpirationDate,
        action.payload.refreshToken
      );

      return {
        ...state,
        authError: null,
        isLoading: false,
        user: user
      };

    case AuthActions.LOGOUT_START:
      return {
        ...state
      };

    case AuthActions.LOGOUT_END:
      return {
        ...state,
        user: null
      };

    case AuthActions.LOGIN_START:
    case AuthActions.REGISTER_START:
      return {
        ...state,
        isLoading: true,
        authError: null
      };

    case AuthActions.AUTH_FAIL:
      return {
        ...state,
        user: null,
        isLoading: false,
        authError: action.payload
      };

    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      };

    default:
      return state;
  }
}
