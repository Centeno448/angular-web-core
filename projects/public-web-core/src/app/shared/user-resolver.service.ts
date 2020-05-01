import { UserService } from './user.service';
import { User } from './../auth/user.model';
import { Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserSelect } from './userSelect.model';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<UserSelect[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions,
    private userService: UserService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService.getAllUsers().pipe(
      switchMap((users) => {
        return of(users);
      })
    );
  }
}
