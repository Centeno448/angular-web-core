import { BookExchange } from './book-exchange.model';
import { Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import * as fromApp from '../store/app.reducer';
import * as ExchangeActions from './store/exchange.actions';
import { Store } from '@ngrx/store';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeResolver implements Resolve<BookExchange[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('exchange').pipe(
      take(1),
      map((exchangeState) => {
        return exchangeState.exchanges;
      }),
      switchMap((exchanges) => {
        if (exchanges.length === 0) {
          this.store.dispatch(new ExchangeActions.FetchExchanges());
          return this.actions$.pipe(
            ofType(ExchangeActions.SET_EXCHANGES),
            take(1)
          );
        } else {
          return of(exchanges);
        }
      })
    );
  }
}
