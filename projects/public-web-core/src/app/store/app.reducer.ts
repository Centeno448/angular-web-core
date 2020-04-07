import * as fromAuth from '../auth/store/auth.reducer';
import * as fromBook from '../book/store/book.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  auth: fromAuth.State;
  book: fromBook.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  book: fromBook.BookReducer
};
