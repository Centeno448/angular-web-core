import { BookCategory } from './book-category.model';
import { Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { take, map, switchMap } from 'rxjs/operators';
import * as BookCategoryActions from './store/book-category.actions';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookCategoryResolver implements Resolve<BookCategory[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('category').pipe(
      take(1),
      map((bookState) => {
        return bookState.categories;
      }),
      switchMap((books) => {
        if (books.length === 0) {
          this.store.dispatch(new BookCategoryActions.FetchCategories());
          return this.actions$.pipe(
            ofType(BookCategoryActions.SET_CATEGORIES),
            take(1)
          );
        } else {
          return of(books);
        }
      })
    );
  }
}
