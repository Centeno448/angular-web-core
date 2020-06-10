import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ExchangeService } from '../../shared/services/book-exchange.service';
import * as ExchangeActions from './book-exchange.actions';
import { of } from 'rxjs';

const handleError = (message) => {
  return of(new ExchangeActions.ErrorOcurred(message));
};

@Injectable()
export class ExchangeEffects {
  @Effect()
  fetchExchanges = this.actions$.pipe(
    ofType(ExchangeActions.FETCH_EXCHANGES),
    switchMap((action: ExchangeActions.FetchExchanges) => {
      return this.ExchangeService.getExchangeByUser(action.payload).pipe(
        map((exchanges) => {
          return new ExchangeActions.SetExchanges(exchanges);
        }),
        catchError((error) => {
          let errorMessage = 'No se pudo obtener los intercambios';
          return handleError(errorMessage);
        })
      );
    })
  );

  @Effect()
  fetchValidExchanges = this.actions$.pipe(
    ofType(ExchangeActions.FETCH_VALID_EXCHANGES),
    switchMap((action: ExchangeActions.FetchValidExchanges) => {
      return this.ExchangeService.getValidExchanges(
        action.payload.categoryId,
        action.payload.userId
      ).pipe(
        map((exchanges) => {
          return new ExchangeActions.SetValidExchanges(exchanges);
        }),
        catchError((error) => {
          let errorMessage = 'No se pudo obtener los intercambios validos';
          return handleError(errorMessage);
        })
      );
    })
  );

  @Effect()
  addExchange = this.actions$.pipe(
    ofType(ExchangeActions.ADD_EXCHANGE),
    switchMap((action: ExchangeActions.AddExchange) => {
      return this.ExchangeService.addExchange(action.payload).pipe(
        map((res) => {
          this.router.navigate(['exchange']);
          return new ExchangeActions.OperationSucess(
            '✔️ Intercambio agregado exitosamente'
          );
        }),
        catchError((error) => {
          console.log('ERROR');
          let errorMessage = 'No se pudo agregar el intercambio';
          return handleError(errorMessage);
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private ExchangeService: ExchangeService,
    private router: Router
  ) {}
}
