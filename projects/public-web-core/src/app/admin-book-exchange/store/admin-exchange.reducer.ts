import { BookExchange } from '../../shared/models/book-exchange.model';
import * as AdminExchangeActions from './admin-exchange.actions';

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

export function AdminExchangeReducer(
  state: State = initialState,
  action: AdminExchangeActions.AdminExchangeActions
) {
  switch (action.type) {
    case AdminExchangeActions.FETCH_EXCHANGES:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case AdminExchangeActions.SET_EXCHANGES:
      return {
        ...state,
        isLoading: false,
        error: null,
        exchanges: action.payload
      };

    case AdminExchangeActions.DELETE_EXCHANGE:
      var exchanges = state.exchanges.filter((exchange) => {
        return exchange.id !== action.payload;
      });

      return {
        ...state,
        exchanges
      };

    case AdminExchangeActions.OPERATION_SUCCESS:
      return {
        ...state,
        error: null,
        success: action.payload
      };

    case AdminExchangeActions.CLEAR_SUCCESS_MESSAGE:
      return {
        ...state,
        success: null
      };

    case AdminExchangeActions.CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        error: null
      };

    case AdminExchangeActions.UPDATE_EXCHANGE:
      var updatedIndex = state.exchanges.findIndex((exchange) => {
        return exchange.id === action.payload.id;
      });

      var updatedExchanges = [...state.exchanges];

      updatedExchanges[updatedIndex] = action.payload.exchange;

      return {
        ...state,
        exchanges: updatedExchanges
      };

    case AdminExchangeActions.ERROR_OCURRED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
