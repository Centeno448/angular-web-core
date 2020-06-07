import * as fromAuth from '../auth/store/auth.reducer';
// Admin
import * as fromAdminBook from '../admin-book/store/admin-book.reducer';
import * as fromCategory from '../book-category/store/book-category.reducer';
import * as fromAdminExchange from '../admin-book-exchange/store/admin-exchange.reducer';
import * as fromAdminRating from '../admin-rating/store/admin-rating.reducer';

//Users
import * as fromBook from '../book/store/book.reducer';

import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  auth: fromAuth.State;
  adminbook: fromAdminBook.State;
  category: fromCategory.State;
  adminexchange: fromAdminExchange.State;
  adminrating: fromAdminRating.State;
  book: fromBook.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  adminbook: fromAdminBook.AdminBookReducer,
  category: fromCategory.BookCategoryReducer,
  adminexchange: fromAdminExchange.AdminExchangeReducer,
  adminrating: fromAdminRating.AdminRatingReducer,
  book: fromBook.BookReducer
};
