import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthWithUserGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => {
        return authState.user;
      }),
      map((user) => {
        const authenticated = !!user;

        if (authenticated) {
          return this.router.createUrlTree(['/home']);
        }

        return true;
      })
    );
  }

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}
}
