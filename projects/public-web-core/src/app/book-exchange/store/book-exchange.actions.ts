import { BookExchange } from '../../shared/models/book-exchange.model';
import { Action } from '@ngrx/store';
import { ExchangeSelect } from '../exchange-select.model';

export const ADD_EXCHANGE = '[Exchange] Add Exchange';
export const FETCH_EXCHANGES = '[Exchange] Fetch Exchanges';
export const FETCH_VALID_EXCHANGES = '[Exchange] Fetch Valid Exchanges';
export const SET_EXCHANGES = '[Exchange] Set Exchanges';
export const SET_VALID_EXCHANGES = '[Exchange] Set Valid Exchanges';
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

  constructor(public payload: number) {}
}

export class FetchValidExchanges implements Action {
  readonly type = FETCH_VALID_EXCHANGES;

  constructor(public payload: { categoryId: number; userId: number }) {}
}

export class SetExchanges implements Action {
  readonly type = SET_EXCHANGES;

  constructor(public payload: BookExchange[]) {}
}

export class SetValidExchanges implements Action {
  readonly type = SET_VALID_EXCHANGES;

  constructor(public payload: ExchangeSelect[]) {}
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

export type ExchangeActions =
  | AddExchange
  | FetchExchanges
  | FetchValidExchanges
  | SetExchanges
  | SetValidExchanges
  | ErrorOcurred
  | OperationSucess
  | ClearSuccessMessage
  | ClearErrorMessage;
