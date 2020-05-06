import * as fromAuth from '../auth/store/auth.reducer';
import * as fromBook from '../book/store/book.reducer';
import * as fromCategory from '../book-category/store/book-category.reducer';
import * as fromExchange from '../book-exchange/store/exchange.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  auth: fromAuth.State;
  book: fromBook.State;
  category: fromCategory.State;
  exchange: fromExchange.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  book: fromBook.BookReducer,
  category: fromCategory.BookCategoryReducer,
  exchange: fromExchange.ExchangeReducer
};
