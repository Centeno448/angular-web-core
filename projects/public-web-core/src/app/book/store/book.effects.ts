import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { BookService } from '../book.service';
import * as BookActions from './book.actions';
import { of } from 'rxjs';

const handleError = (error) => {
  let errorMessage = 'No se pudo completar la acción';

  switch (error.error.message) {
    case 'IN_USE':
      errorMessage = 'El libro forma parte de un intercambio.';
      break;

    default:
      break;
  }

  return of(new BookActions.ErrorOcurred(errorMessage));
};

@Injectable()
export class BookEffects {
  @Effect()
  fetchBooks = this.actions$.pipe(
    ofType(BookActions.FETCH_BOOKS),
    switchMap((action: BookActions.FetchBooks) => {
      return this.bookService.getAllBooks().pipe(
        map((books) => {
          return new BookActions.SetBooks(books);
        }),
        catchError((error) => {
          return handleError(error);
        })
      );
    })
  );

  @Effect()
  deleteBookStart = this.actions$.pipe(
    ofType(BookActions.DELETE_BOOK_START),
    switchMap((action: BookActions.DeleteBookStart) => {
      return this.bookService.deleteBook(action.payload).pipe(
        map((res) => {
          return new BookActions.DeleteBook(action.payload);
        }),
        catchError((error) => {
          return handleError(error);
        })
      );
    })
  );

  @Effect()
  deleteBook = this.actions$.pipe(
    ofType(BookActions.DELETE_BOOK),
    switchMap((action: BookActions.DeleteBook) => {
      return of(
        new BookActions.OperationSucess('✔️ Libro eliminado exitosamente')
      );
    })
  );

  @Effect()
  addBook = this.actions$.pipe(
    ofType(BookActions.ADD_BOOK),
    switchMap((action: BookActions.AddBook) => {
      return this.bookService.addBook(action.payload).pipe(
        map((res) => {
          this.router.navigate(['book']);
          return new BookActions.OperationSucess(
            '✔️ Libro agregado exitosamente'
          );
        }),
        catchError((error) => {
          return handleError(error);
        })
      );
    })
  );

  @Effect()
  updateBook = this.actions$.pipe(
    ofType(BookActions.UPDATE_BOOK),
    switchMap((action: BookActions.UpdateBook) => {
      return this.bookService
        .updateBook(action.payload.id, action.payload.book)
        .pipe(
          map((res) => {
            this.router.navigate(['book']);
            return new BookActions.OperationSucess(
              '✔️ Libro editado exitosamente'
            );
          }),
          catchError((error) => {
            return handleError(error);
          })
        );
    })
  );

  constructor(
    private actions$: Actions,
    private bookService: BookService,
    private router: Router
  ) {}
}
