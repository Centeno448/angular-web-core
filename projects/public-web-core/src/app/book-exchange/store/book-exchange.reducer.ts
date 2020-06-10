import { BookExchange } from '../../shared/models/book-exchange.model';
import * as ExchangeActions from './book-exchange.actions';
import { ExchangeSelect } from '../exchange-select.model';

export interface State {
  exchanges: BookExchange[];
  validExchanges: ExchangeSelect[];
  error: string;
  isLoading: boolean;
  success: string;
}

const initialState: State = {
  exchanges: [],
  validExchanges: [],
  error: null,
  isLoading: false,
  success: null
};

export function ExchangeReducer(
  state: State = initialState,
  action: ExchangeActions.ExchangeActions
) {
  switch (action.type) {
    case ExchangeActions.FETCH_EXCHANGES:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case ExchangeActions.SET_EXCHANGES:
      return {
        ...state,
        isLoading: false,
        error: null,
        exchanges: action.payload
      };

    case ExchangeActions.SET_VALID_EXCHANGES:
      return {
        ...state,
        validExchanges: action.payload
      };

    case ExchangeActions.OPERATION_SUCCESS:
      return {
        ...state,
        error: null,
        success: action.payload
      };

    case ExchangeActions.CLEAR_SUCCESS_MESSAGE:
      return {
        ...state,
        success: null
      };

    case ExchangeActions.CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        error: null
      };

    case ExchangeActions.ERROR_OCURRED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
