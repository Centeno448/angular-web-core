import { Book } from '../../shared/models/book.model';
import * as AdminBookActions from './admin-book.actions';

export interface State {
  books: Book[];
  error: string;
  isLoading: boolean;
  success: string;
}

const initialState: State = {
  books: [],
  error: null,
  isLoading: false,
  success: null
};

export function AdminBookReducer(
  state: State = initialState,
  action: AdminBookActions.AdminBookActions
) {
  switch (action.type) {
    case AdminBookActions.FETCH_BOOKS:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case AdminBookActions.SET_BOOKS:
      return {
        ...state,
        isLoading: false,
        error: null,
        books: action.payload
      };

    case AdminBookActions.DELETE_BOOK:
      var books = state.books.filter((book) => {
        return book.id !== action.payload;
      });

      return {
        ...state,
        books
      };

    case AdminBookActions.OPERATION_SUCCESS:
      return {
        ...state,
        error: null,
        success: action.payload
      };

    case AdminBookActions.CLEAR_SUCCESS_MESSAGE:
      return {
        ...state,
        success: null
      };

    case AdminBookActions.UPDATE_BOOK:
      var updatedIndex = state.books.findIndex((book) => {
        return book.id === action.payload.id;
      });

      var updatedBooks = [...state.books];

      updatedBooks[updatedIndex] = action.payload.book;

      return {
        ...state,
        books: updatedBooks
      };

    case AdminBookActions.ERROR_OCURRED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
