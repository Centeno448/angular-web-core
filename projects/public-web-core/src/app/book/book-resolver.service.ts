import { Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Book } from '../shared/models/book.model';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { take, map, switchMap } from 'rxjs/operators';
import * as BookActions from './store/book.actions';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookResolver implements Resolve<Book[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var userId = 0;

    this.store
      .select('auth')
      .pipe(
        take(1),
        map((authState) => {
          return authState.user.id;
        })
      )
      .subscribe((id) => {
        userId = id;
      });

    return this.store.select('book').pipe(
      take(1),
      map((bookState) => {
        return bookState.books;
      }),
      switchMap((books) => {
        if (books.length === 0) {
          this.store.dispatch(new BookActions.FetchBooks(userId));
          return this.actions$.pipe(ofType(BookActions.SET_BOOKS), take(1));
        } else {
          return of(books);
        }
      })
    );
  }
}
