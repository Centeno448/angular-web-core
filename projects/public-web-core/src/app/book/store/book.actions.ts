import { Book } from './../book.model';
import { Action } from '@ngrx/store';

export const ADD_BOOK = '[Book] Add Book';
export const FETCH_BOOKS = '[Book] Fetch Books';
export const SET_BOOKS = '[Book] Set Books';
export const ERROR_OCURRED = '[Book] Error Ocurred';
export const OPERATION_SUCCESS = '[Book] Operation Success';
export const UPDATE_BOOK = '[Book] Update Book';
export const DELETE_BOOK = '[Book] Delete Book';
export const CLEAR_SUCCESS_MESSAGE = '[Book] Clear Success Message';

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

export class DeleteBook implements Action {
  readonly type = DELETE_BOOK;

  constructor(public payload: number) {}
}

export type BookActions =
  | AddBook
  | FetchBooks
  | SetBooks
  | UpdateBook
  | DeleteBook
  | ErrorOcurred
  | OperationSucess
  | ClearSuccessMessage;
