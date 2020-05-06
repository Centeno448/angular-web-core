import { BookExchange } from './../book-exchange.model';
import { Action } from '@ngrx/store';

export const ADD_EXCHANGE = '[Exchange] Add Exchange';
export const FETCH_EXCHANGES = '[Exchange] Fetch Exchanges';
export const SET_EXCHANGES = '[Exchange] Set Exchanges';
export const ERROR_OCURRED = '[Exchange] Error Ocurred';
export const OPERATION_SUCCESS = '[Exchange] Operation Success';
export const UPDATE_EXCHANGE = '[Exchange] Update Exchange';
export const DELETE_EXCHANGE_START = '[Exchange] Delete Exchange Start';
export const DELETE_EXCHANGE = '[Exchange] Delete Exchange';
export const CLEAR_SUCCESS_MESSAGE = '[Exchange] Clear Success Message';
export const CLEAR_ERROR_MESSAGE = '[Exchange] Clear Error Message';

export class AddExchange implements Action {
  readonly type = ADD_EXCHANGE;

  constructor(public payload: BookExchange) {}
}

export class FetchExchanges implements Action {
  readonly type = FETCH_EXCHANGES;
}

export class SetExchanges implements Action {
  readonly type = SET_EXCHANGES;

  constructor(public payload: BookExchange[]) {}
}

export class ErrorOcurred implements Action {
  readonly type = ERROR_OCURRED;

  constructor(public payload: string) {}
}

export class OperationSucess implements Action {
  readonly type = OPERATION_SUCCESS;

  constructor(public payload: string) {}
}

export class ClearSuccessMessage implements Action {
  readonly type = CLEAR_SUCCESS_MESSAGE;
}

export class ClearErrorMessage implements Action {
  readonly type = CLEAR_ERROR_MESSAGE;
}

export class UpdateExchange implements Action {
  readonly type = UPDATE_EXCHANGE;

  constructor(public payload: { id: number; exchange: BookExchange }) {}
}

export class DeleteExchangeStart implements Action {
  readonly type = DELETE_EXCHANGE_START;

  constructor(public payload: number) {}
}

export class DeleteExchange implements Action {
  readonly type = DELETE_EXCHANGE;

  constructor(public payload: number) {}
}

export type ExchangeActions =
  | AddExchange
  | FetchExchanges
  | SetExchanges
  | UpdateExchange
  | DeleteExchangeStart
  | DeleteExchange
  | ErrorOcurred
  | OperationSucess
  | ClearSuccessMessage
  | ClearErrorMessage;
