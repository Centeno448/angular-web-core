import { Rating } from './../rating.model';
import { Action } from '@ngrx/store';

export const ADD_RATING = '[Rating] Add Rating';
export const FETCH_RATINGS = '[Rating] Fetch Ratings';
export const SET_RATINGS = '[Rating] Set Ratings';
export const ERROR_OCURRED = '[Rating] Error Ocurred';
export const OPERATION_SUCCESS = '[Rating] Operation Success';
export const UPDATE_RATING = '[Rating] Update Rating';
export const DELETE_RATING_START = '[Rating] Delete Rating Start';
export const DELETE_RATING = '[Rating] Delete Rating';
export const CLEAR_SUCCESS_MESSAGE = '[Rating] Clear Success Message';
export const CLEAR_ERROR_MESSAGE = '[Rating] Clear Error Message';

export class AddRating implements Action {
  readonly type = ADD_RATING;

  constructor(public payload: Rating) {}
}

export class FetchRatings implements Action {
  readonly type = FETCH_RATINGS;
}

export class SetRatings implements Action {
  readonly type = SET_RATINGS;

  constructor(public payload: Rating[]) {}
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

export class UpdateRating implements Action {
  readonly type = UPDATE_RATING;

  constructor(public payload: { id: number; rating: Rating }) {}
}

export class DeleteRatingStart implements Action {
  readonly type = DELETE_RATING_START;

  constructor(public payload: number) {}
}

export class DeleteRating implements Action {
  readonly type = DELETE_RATING;

  constructor(public payload: number) {}
}

export type RatingActions =
  | AddRating
  | FetchRatings
  | SetRatings
  | UpdateRating
  | DeleteRatingStart
  | DeleteRating
  | ErrorOcurred
  | OperationSucess
  | ClearSuccessMessage
  | ClearErrorMessage;
