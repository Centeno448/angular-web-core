import { Rating } from '../../shared/models/rating.model';
import { Action } from '@ngrx/store';

export const ADD_RATING = '[Admin-Rating] Add Rating';
export const FETCH_RATINGS = '[Admin-Rating] Fetch Ratings';
export const SET_RATINGS = '[Admin-Rating] Set Ratings';
export const ERROR_OCURRED = '[Admin-Rating] Error Ocurred';
export const OPERATION_SUCCESS = '[Admin-Rating] Operation Success';
export const UPDATE_RATING = '[Admin-Rating] Update Rating';
export const DELETE_RATING_START = '[Admin-Rating] Delete Rating Start';
export const DELETE_RATING = '[Admin-Rating] Delete Rating';
export const CLEAR_SUCCESS_MESSAGE = '[Admin-Rating] Clear Success Message';
export const CLEAR_ERROR_MESSAGE = '[Admin-Rating] Clear Error Message';

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

export type AdminRatingActions =
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
