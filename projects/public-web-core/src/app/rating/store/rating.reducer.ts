import { Rating } from './../rating.model';
import * as RatingActions from './rating.actions';

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

export function RatingReducer(
  state: State = initialState,
  action: RatingActions.RatingActions
) {
  switch (action.type) {
    case RatingActions.FETCH_RATINGS:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case RatingActions.SET_RATINGS:
      return {
        ...state,
        isLoading: false,
        error: null,
        ratings: action.payload
      };

    case RatingActions.DELETE_RATING:
      var ratings = state.ratings.filter((rating) => {
        return rating.id !== action.payload;
      });

      return {
        ...state,
        ratings
      };

    case RatingActions.OPERATION_SUCCESS:
      return {
        ...state,
        error: null,
        success: action.payload
      };

    case RatingActions.CLEAR_SUCCESS_MESSAGE:
      return {
        ...state,
        success: null
      };

    case RatingActions.CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        error: null
      };

    case RatingActions.UPDATE_RATING:
      var updatedIndex = state.ratings.findIndex((rating) => {
        return rating.id === action.payload.id;
      });

      var updatedRatings = [...state.ratings];

      updatedRatings[updatedIndex] = action.payload.rating;

      return {
        ...state,
        ratings: updatedRatings
      };

    case RatingActions.ERROR_OCURRED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
