import { Rating } from './../rating.model';
import * as AdminRatingActions from './admin-rating.actions';

export interface State {
  ratings: Rating[];
  error: string;
  isLoading: boolean;
  success: string;
}

const initialState: State = {
  ratings: [],
  error: null,
  isLoading: false,
  success: null
};

export function AdminRatingReducer(
  state: State = initialState,
  action: AdminRatingActions.AdminRatingActions
) {
  switch (action.type) {
    case AdminRatingActions.FETCH_RATINGS:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case AdminRatingActions.SET_RATINGS:
      return {
        ...state,
        isLoading: false,
        error: null,
        ratings: action.payload
      };

    case AdminRatingActions.DELETE_RATING:
      var ratings = state.ratings.filter((rating) => {
        return rating.id !== action.payload;
      });

      return {
        ...state,
        ratings
      };

    case AdminRatingActions.OPERATION_SUCCESS:
      return {
        ...state,
        error: null,
        success: action.payload
      };

    case AdminRatingActions.CLEAR_SUCCESS_MESSAGE:
      return {
        ...state,
        success: null
      };

    case AdminRatingActions.CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        error: null
      };

    case AdminRatingActions.UPDATE_RATING:
      var updatedIndex = state.ratings.findIndex((rating) => {
        return rating.id === action.payload.id;
      });

      var updatedRatings = [...state.ratings];

      updatedRatings[updatedIndex] = action.payload.rating;

      return {
        ...state,
        ratings: updatedRatings
      };

    case AdminRatingActions.ERROR_OCURRED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
