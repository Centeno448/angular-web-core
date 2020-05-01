import { BookCategory } from './../book-category.model';
import * as CategoryActions from './book-category.actions';

export interface State {
  categories: BookCategory[];
  error: string;
  isLoading: boolean;
  success: string;
}

const initialState: State = {
  categories: [],
  error: null,
  isLoading: false,
  success: null
};

export function BookCategoryReducer(
  state: State = initialState,
  action: CategoryActions.BookCategoryActions
) {
  switch (action.type) {
    case CategoryActions.FETCH_CATEGORIES:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case CategoryActions.SET_CATEGORIES:
      return {
        ...state,
        isLoading: false,
        error: null,
        categories: action.payload
      };

    case CategoryActions.DELETE_CATEGORY:
      var categories = state.categories.filter((category) => {
        return category.id !== action.payload;
      });

      return {
        ...state,
        categories
      };

    case CategoryActions.OPERATION_SUCCESS:
      return {
        ...state,
        error: null,
        success: action.payload
      };

    case CategoryActions.CLEAR_SUCCESS_MESSAGE:
      return {
        ...state,
        success: null
      };

    case CategoryActions.UPDATE_CATEGORY:
      var updatedIndex = state.categories.findIndex((category) => {
        return category.id === action.payload.id;
      });

      var updatedCategories = [...state.categories];

      updatedCategories[updatedIndex] = action.payload.category;

      return {
        ...state,
        categories: updatedCategories
      };

    case CategoryActions.ERROR_OCURRED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
