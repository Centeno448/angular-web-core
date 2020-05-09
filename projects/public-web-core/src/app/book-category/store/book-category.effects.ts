import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { BookCategoryService } from '../book-category.service';
import * as BookCategoryActions from './book-category.actions';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

const handleError = (error: HttpErrorResponse) => {
  let errorMessage = 'No se pudo completar la acción';

  switch (error.error.message) {
    case 'IN_USE':
      errorMessage = 'La categoría se encuentra en uso.';
      break;

    default:
      break;
  }

  return of(new BookCategoryActions.ErrorOcurred(errorMessage));
};

@Injectable()
export class BookCategoryEffects {
  @Effect()
  fetchCategories = this.actions$.pipe(
    ofType(BookCategoryActions.FETCH_CATEGORIES),
    switchMap((action: BookCategoryActions.FetchCategories) => {
      return this.bookCategoryService.getAllCategories().pipe(
        map((categories) => {
          return new BookCategoryActions.SetCategories(categories);
        }),
        catchError((error) => {
          return handleError(error);
        })
      );
    })
  );

  @Effect()
  deleteCategoryStart = this.actions$.pipe(
    ofType(BookCategoryActions.DELETE_CATEGORY_START),
    switchMap((action: BookCategoryActions.DeleteCategory) => {
      return this.bookCategoryService.deleteCategory(action.payload).pipe(
        map((res) => {
          return new BookCategoryActions.DeleteCategory(action.payload);
        }),
        catchError((error) => {
          return handleError(error);
        })
      );
    })
  );

  @Effect()
  deleteCategory = this.actions$.pipe(
    ofType(BookCategoryActions.DELETE_CATEGORY),
    switchMap((action: BookCategoryActions.DeleteCategory) => {
      return of(
        new BookCategoryActions.OperationSucess(
          '✔️ Categoría eliminada exitosamente'
        )
      );
    })
  );

  @Effect()
  addCategory = this.actions$.pipe(
    ofType(BookCategoryActions.ADD_CATEGORY),
    switchMap((action: BookCategoryActions.AddCategory) => {
      return this.bookCategoryService.addCategory(action.payload).pipe(
        map((res) => {
          this.router.navigate(['category']);
          return new BookCategoryActions.OperationSucess(
            '✔️ Categoría agregada exitosamente'
          );
        }),
        catchError((error) => {
          return handleError(error);
        })
      );
    })
  );

  @Effect()
  updateCategory = this.actions$.pipe(
    ofType(BookCategoryActions.UPDATE_CATEGORY),
    switchMap((action: BookCategoryActions.UpdateCategory) => {
      return this.bookCategoryService
        .updateCategory(action.payload.id, action.payload.category)
        .pipe(
          map((res) => {
            this.router.navigate(['category']);
            return new BookCategoryActions.OperationSucess(
              '✔️ Categoría editada exitosamente'
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
    private bookCategoryService: BookCategoryService,
    private router: Router
  ) {}
}
