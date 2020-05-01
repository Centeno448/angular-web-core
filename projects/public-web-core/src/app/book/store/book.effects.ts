import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { BookService } from '../book.service';
import * as BookActions from './book.actions';
import { of } from 'rxjs';

const handleError = (message) => {
  return of(new BookActions.ErrorOcurred(message));
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
          let errorMessage = 'No se pudo obtener los libros';
          return handleError(errorMessage);
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
          let errorMessage = 'No se pudo eliminar el libro';
          return handleError(errorMessage);
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
          let errorMessage = 'No se pudo agregar el libro';
          return handleError(errorMessage);
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
            let errorMessage = 'No se pudo editar el libro';
            return handleError(errorMessage);
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
