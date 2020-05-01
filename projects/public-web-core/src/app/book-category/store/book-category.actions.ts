import { BookCategory } from './../book-category.model';
import { Action } from '@ngrx/store';

export const ADD_CATEGORY = '[Category] Add Category';
export const FETCH_CATEGORIES = '[Category] Fetch Categories';
export const SET_CATEGORIES = '[Category] Set Categories';
export const ERROR_OCURRED = '[Category] Error Ocurred';
export const OPERATION_SUCCESS = '[Category] Operation Success';
export const UPDATE_CATEGORY = '[Category] Update Category';
export const DELETE_CATEGORY_START = '[Category] Delete Category Start';
export const DELETE_CATEGORY = '[Category] Delete Category';
export const CLEAR_SUCCESS_MESSAGE = '[Category] Clear Success Message';

export class AddCategory implements Action {
  readonly type = ADD_CATEGORY;

  constructor(public payload: BookCategory) {}
}

export class FetchCategories implements Action {
  readonly type = FETCH_CATEGORIES;
}

export class SetCategories implements Action {
  readonly type = SET_CATEGORIES;

  constructor(public payload: BookCategory[]) {}
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

export class UpdateCategory implements Action {
  readonly type = UPDATE_CATEGORY;

  constructor(public payload: { id: number; category: BookCategory }) {}
}

export class DeleteCategoryStart implements Action {
  readonly type = DELETE_CATEGORY_START;

  constructor(public payload: number) {}
}

export class DeleteCategory implements Action {
  readonly type = DELETE_CATEGORY;

  constructor(public payload: number) {}
}

export type BookCategoryActions =
  | AddCategory
  | FetchCategories
  | SetCategories
  | UpdateCategory
  | DeleteCategoryStart
  | DeleteCategory
  | ErrorOcurred
  | OperationSucess
  | ClearSuccessMessage;
