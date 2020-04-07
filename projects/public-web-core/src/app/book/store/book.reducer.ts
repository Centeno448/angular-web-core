import { Book } from './../book.model';
import * as BookActions from './book.actions';

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

export function BookReducer(
  state: State = initialState,
  action: BookActions.BookActions
) {
  switch (action.type) {
    case BookActions.FETCH_BOOKS:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case BookActions.SET_BOOKS:
      return {
        ...state,
        isLoading: false,
        error: null,
        books: action.payload
      };

    case BookActions.DELETE_BOOK:
      var books = state.books.filter((book) => {
        return book.id !== action.payload;
      });

      return {
        ...state,
        books
      };

    case BookActions.OPERATION_SUCCESS:
      return {
        ...state,
        error: null,
        success: action.payload
      };

    case BookActions.CLEAR_SUCCESS_MESSAGE:
      return {
        ...state,
        success: null
      };

    case BookActions.UPDATE_BOOK:
      var updatedIndex = state.books.findIndex((book) => {
        return book.id === action.payload.id;
      });

      var updatedBooks = [...state.books];

      updatedBooks[updatedIndex] = action.payload.book;

      return {
        ...state,
        books: updatedBooks
      };

    case BookActions.ERROR_OCURRED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
