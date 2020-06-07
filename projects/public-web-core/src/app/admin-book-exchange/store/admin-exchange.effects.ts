import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ExchangeService } from '../book-exchange.service';
import * as ExchangeActions from './admin-exchange.actions';
import { of } from 'rxjs';

const handleError = (message) => {
  return of(new ExchangeActions.ErrorOcurred(message));
};

@Injectable()
export class AdminExchangeEffects {
  @Effect()
  fetchExchanges = this.actions$.pipe(
    ofType(ExchangeActions.FETCH_EXCHANGES),
    switchMap((action: ExchangeActions.FetchExchanges) => {
      return this.ExchangeService.getAllExchanges().pipe(
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
  deleteExchangeStart = this.actions$.pipe(
    ofType(ExchangeActions.DELETE_EXCHANGE_START),
    switchMap((action: ExchangeActions.DeleteExchangeStart) => {
      return this.ExchangeService.deleteExchange(action.payload).pipe(
        map((res) => {
          return new ExchangeActions.DeleteExchange(action.payload);
        }),
        catchError((error) => {
          let errorMessage = 'No se pudo eliminar el intercambio';
          return handleError(errorMessage);
        })
      );
    })
  );

  @Effect()
  deleteExchange = this.actions$.pipe(
    ofType(ExchangeActions.DELETE_EXCHANGE),
    switchMap((action: ExchangeActions.DeleteExchange) => {
      return of(
        new ExchangeActions.OperationSucess(
          '✔️ Intercambio eliminado exitosamente'
        )
      );
    })
  );

  @Effect()
  addExchange = this.actions$.pipe(
    ofType(ExchangeActions.ADD_EXCHANGE),
    switchMap((action: ExchangeActions.AddExchange) => {
      return this.ExchangeService.addExchange(action.payload).pipe(
        map((res) => {
          this.router.navigate(['admin-exchange']);
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

  @Effect()
  updateExchange = this.actions$.pipe(
    ofType(ExchangeActions.UPDATE_EXCHANGE),
    switchMap((action: ExchangeActions.UpdateExchange) => {
      return this.ExchangeService.updateExchange(
        action.payload.id,
        action.payload.exchange
      ).pipe(
        map((res) => {
          this.router.navigate(['admin-exchange']);
          return new ExchangeActions.OperationSucess(
            '✔️ Intercambio editado exitosamente'
          );
        }),
        catchError((error) => {
          let errorMessage = 'No se pudo editar el intercambio';
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
