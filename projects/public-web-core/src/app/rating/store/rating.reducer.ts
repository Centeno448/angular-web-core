import { UserSelect } from './../../shared/userSelect.model';
import { Rating } from '../../shared/models/rating.model';
import * as RatingActions from './rating.actions';

export interface State {
  sentRatings: Rating[];
  recievedRatings: Rating[];
  validUsers: UserSelect[];
  error: string;
  isLoading: boolean;
  success: string;
}

const initialState: State = {
  sentRatings: [],
  recievedRatings: [],
  validUsers: [],
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
    case RatingActions.FETCH_RECIEVED_RATINGS:
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
        sentRatings: action.payload
      };

    case RatingActions.SET_VALID_USERS:
      return {
        ...state,
        validUsers: action.payload
      };

    case RatingActions.SET_RECIEVED_RATINGS:
      return {
        ...state,
        isLoading: false,
        error: null,
        recievedRatings: action.payload
      };

    case RatingActions.DELETE_RATING:
      var sentRatings = state.sentRatings.filter((rating) => {
        return rating.id !== action.payload;
      });

      return {
        ...state,
        sentRatings
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
      var updatedIndex = state.sentRatings.findIndex((rating) => {
        return rating.id === action.payload.id;
      });

      var updatedRatings = [...state.sentRatings];

      updatedRatings[updatedIndex] = action.payload.rating;

      return {
        ...state,
        sentRatings: updatedRatings
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
