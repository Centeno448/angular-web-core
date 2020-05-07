import { Rating } from './rating.model';
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
export class RatingResolver implements Resolve<Rating[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('rating').pipe(
      take(1),
      map((ratingState) => {
        return ratingState.ratings;
      }),
      switchMap((ratings) => {
        if (ratings.length === 0) {
          this.store.dispatch(new RatingActions.FetchRatings());
          return this.actions$.pipe(ofType(RatingActions.SET_RATINGS), take(1));
        } else {
          return of(ratings);
        }
      })
    );
  }
}
