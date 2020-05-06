import { BookExchange } from './../book-exchange.model';
import * as ExchangeActions from './exchange.actions';

export interface State {
  exchanges: BookExchange[];
  error: string;
  isLoading: boolean;
  success: string;
}

const initialState: State = {
  exchanges: [],
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

    case ExchangeActions.DELETE_EXCHANGE:
      var exchanges = state.exchanges.filter((exchange) => {
        return exchange.id !== action.payload;
      });

      return {
        ...state,
        exchanges
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

    case ExchangeActions.UPDATE_EXCHANGE:
      var updatedIndex = state.exchanges.findIndex((exchange) => {
        return exchange.id === action.payload.id;
      });

      var updatedExchanges = [...state.exchanges];

      updatedExchanges[updatedIndex] = action.payload.exchange;

      return {
        ...state,
        exchanges: updatedExchanges
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
