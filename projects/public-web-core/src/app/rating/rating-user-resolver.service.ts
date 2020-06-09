import { UserSelect } from './../shared/userSelect.model';
import { Rating } from '../shared/models/rating.model';
import { Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import * as fromApp from '../store/app.reducer';
import * as RatingActions from './store/rating.actions';
import { Store } from '@ngrx/store';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingUserResolver implements Resolve<UserSelect[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var userId = 0;

    this.store
      .select('auth')
      .pipe(
        take(1),
        map((authState) => {
          return authState.user.id;
        })
      )
      .subscribe((id) => {
        userId = id;
      });

    return this.store.select('rating').pipe(
      take(1),
      map((ratingState) => {
        return ratingState.validUsers;
      }),
      switchMap((users) => {
        if (users.length === 0) {
          this.store.dispatch(new RatingActions.FetchValidUsers(userId));
          return this.actions$.pipe(
            ofType(RatingActions.SET_VALID_USERS),
            take(1)
          );
        } else {
          return of(users);
        }
      })
    );
  }
}
