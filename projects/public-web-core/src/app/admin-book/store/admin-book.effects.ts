import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { BookService } from '../../shared/services/book.service';
import * as AdminBookActions from './admin-book.actions';
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

  return of(new AdminBookActions.ErrorOcurred(errorMessage));
};

@Injectable()
export class AdminBookEffects {
  @Effect()
  fetchBooks = this.actions$.pipe(
    ofType(AdminBookActions.FETCH_BOOKS),
    switchMap((action: AdminBookActions.FetchBooks) => {
      return this.bookService.getAllBooks().pipe(
        map((books) => {
          return new AdminBookActions.SetBooks(books);
        }),
        catchError((error) => {
          return handleError(error);
        })
      );
    })
  );

  @Effect()
  deleteBookStart = this.actions$.pipe(
    ofType(AdminBookActions.DELETE_BOOK_START),
    switchMap((action: AdminBookActions.DeleteBookStart) => {
      return this.bookService.deleteBook(action.payload).pipe(
        map((res) => {
          return new AdminBookActions.DeleteBook(action.payload);
        }),
        catchError((error) => {
          return handleError(error);
        })
      );
    })
  );

  @Effect()
  deleteBook = this.actions$.pipe(
    ofType(AdminBookActions.DELETE_BOOK),
    switchMap((action: AdminBookActions.DeleteBook) => {
      return of(
        new AdminBookActions.OperationSucess('✔️ Libro eliminado exitosamente')
      );
    })
  );

  @Effect()
  addBook = this.actions$.pipe(
    ofType(AdminBookActions.ADD_BOOK),
    switchMap((action: AdminBookActions.AddBook) => {
      return this.bookService.addBook(action.payload).pipe(
        map((res) => {
          this.router.navigate(['admin-book']);
          return new AdminBookActions.OperationSucess(
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
    ofType(AdminBookActions.UPDATE_BOOK),
    switchMap((action: AdminBookActions.UpdateBook) => {
      return this.bookService
        .updateBook(action.payload.id, action.payload.book)
        .pipe(
          map((res) => {
            this.router.navigate(['admin-book']);
            return new AdminBookActions.OperationSucess(
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
