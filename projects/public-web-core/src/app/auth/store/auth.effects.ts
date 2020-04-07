import { AuthLoginModel } from './../auth-login.model';
import { switchMap, tap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import * as AuthActions from './auth.actions';
import { ApiRegisterModel } from '../api-register.model';
import { of } from 'rxjs';
import { User } from '../user.model';
import { AuthResponseModel } from '../auth-response.model';

const handleLoginError = (errorRes) => {
  let errorMessage = 'An unkown error ocurred!';

  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthFail(errorMessage));
  }

  switch (errorRes.error.message) {
    case 'USER_NOT_FOUND':
    case 'NO_DATA':
    case 'BAD_PAYLOAD':
      errorMessage = 'Verifique los datos ingresados';
      break;
  }

  return of(new AuthActions.AuthFail(errorMessage));
};

const handleRegisterError = (errorRes) => {
  let errorMessage = 'An unkown error ocurred!';

  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthFail(errorMessage));
  }

  switch (errorRes.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'El Correo ya se encuentra en uso';
      break;

    case 'USERNAME_EXISTS':
      errorMessage = 'El nombre de usuario ya se encuentra en uso.';
      break;
  }

  return of(new AuthActions.AuthFail(errorMessage));
};

const handleAuth = (
  id: number,
  username: string,
  expiresIn: number,
  accessToken: string,
  refreshToken: string
) => {
  const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);

  const user: User = new User(
    id,
    username,
    accessToken,
    expirationDate,
    refreshToken
  );
  localStorage.setItem('userData', JSON.stringify(user));

  return new AuthActions.AuthSuccess({
    id,
    username,
    accessToken,
    refreshToken,
    tokenExpirationDate: expirationDate,
    redirect: true
  });
};

@Injectable()
export class AuthEffects {
  @Effect()
  register = this.actions$.pipe(
    ofType(AuthActions.REGISTER_START),
    switchMap((registerAction: AuthActions.RegisterStart) => {
      const user: ApiRegisterModel = {
        username: registerAction.payload.username,
        email: registerAction.payload.email,
        password: registerAction.payload.password,
        role: 'user'
      };

      return this.authService.register(user).pipe(
        map((res) => {
          const loginUser: AuthLoginModel = {
            username: user.username,
            password: user.password
          };
          return new AuthActions.LoginStart(loginUser);
        }),
        catchError((error) => {
          return handleRegisterError(error);
        })
      );
    })
  );

  @Effect()
  login = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      const user: AuthLoginModel = {
        password: authData.payload.password,
        username: authData.payload.username
      };
      return this.authService.login(user).pipe(
        map((res: AuthResponseModel) => {
          return handleAuth(
            res.id,
            res.username,
            res.expiresIn,
            res.accessToken,
            res.refreshToken
          );
        }),
        catchError((error) => {
          return handleLoginError(error);
        })
      );
    })
  );

  @Effect({ dispatch: false })
  redirect = this.actions$.pipe(
    ofType(AuthActions.AUTH_SUCCESS),
    tap((action: AuthActions.AuthSuccess) => {
      if (action.payload.redirect) {
        this.router.navigate(['/']);
      }
    })
  );

  @Effect()
  logoutStart = this.actions$.pipe(
    ofType(AuthActions.LOGOUT_START),
    switchMap((logoutAction: AuthActions.LogoutStart) => {
      return this.authService.logout(logoutAction.payload).pipe(
        map((res) => {
          return new AuthActions.LogoutEnd();
        })
      );
    })
  );

  @Effect({ dispatch: false })
  logoutEnd = this.actions$.pipe(
    ofType(AuthActions.LOGOUT_END),
    tap((action: AuthActions.LogoutEnd) => {
      localStorage.removeItem('userData');
      this.router.navigate(['/auth/login']);
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        id: number;
        username: string;
        _accesstoken: string;
        _tokenExpirationDate: Date;
        _refreshToken: string;
      } = JSON.parse(localStorage.getItem('userData'));

      if (!userData) {
        return { type: 'NONE' };
      }

      if (
        new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime() <=
        0
      ) {
        return { type: 'NONE' };
      }

      return new AuthActions.AuthSuccess({
        id: userData.id,
        username: userData.username,
        accessToken: userData._accesstoken,
        refreshToken: userData._refreshToken,
        tokenExpirationDate: userData._tokenExpirationDate,
        redirect: false
      });
    })
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService
  ) {}
}
