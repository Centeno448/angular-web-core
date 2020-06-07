import { Book } from '../../shared/models/book.model';
import { Action } from '@ngrx/store';

export const ADD_BOOK = '[Admin-Book] Add Book';
export const FETCH_BOOKS = '[Admin-Book] Fetch Books';
export const SET_BOOKS = '[Admin-Book] Set Books';
export const ERROR_OCURRED = '[Admin-Book] Error Ocurred';
export const OPERATION_SUCCESS = '[Admin-Book] Operation Success';
export const UPDATE_BOOK = '[Admin-Book] Update Book';
export const DELETE_BOOK_START = '[Admin-Book] Delete Book Start';
export const DELETE_BOOK = '[Admin-Book] Delete Book';
export const CLEAR_SUCCESS_MESSAGE = '[Admin-Book] Clear Success Message';

export class AddBook implements Action {
  readonly type = ADD_BOOK;

  constructor(public payload: Book) {}
}

export class FetchBooks implements Action {
  readonly type = FETCH_BOOKS;
}

export class SetBooks implements Action {
  readonly type = SET_BOOKS;

  constructor(public payload: Book[]) {}
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

export class UpdateBook implements Action {
  readonly type = UPDATE_BOOK;

  constructor(public payload: { id: number; book: Book }) {}
}

export class DeleteBookStart implements Action {
  readonly type = DELETE_BOOK_START;

  constructor(public payload: number) {}
}

export class DeleteBook implements Action {
  readonly type = DELETE_BOOK;

  constructor(public payload: number) {}
}

export type AdminBookActions =
  | AddBook
  | FetchBooks
  | SetBooks
  | UpdateBook
  | DeleteBookStart
  | DeleteBook
  | ErrorOcurred
  | OperationSucess
  | ClearSuccessMessage;
