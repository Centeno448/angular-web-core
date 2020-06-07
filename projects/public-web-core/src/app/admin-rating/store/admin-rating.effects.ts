import { Router } from '@angular/router';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { RatingService } from '../rating.service';
import * as AdminRatingActions from './admin-rating.actions';
import { of } from 'rxjs';

const handleError = (error) => {
  let errorMessage = 'No se pudo agregar la reseña';
  switch (error.error.message) {
    case 'DUPLICATE_RATING':
      errorMessage = 'Ya existe una reseña con esa combinación de usuarios';
      break;

    default:
      break;
  }

  return of(new AdminRatingActions.ErrorOcurred(errorMessage));
};

@Injectable()
export class AdminRatingEffects {
  @Effect()
  fetchRatings = this.actions$.pipe(
    ofType(AdminRatingActions.FETCH_RATINGS),
    switchMap((action: AdminRatingActions.FetchRatings) => {
      return this.ratingService.getAllRatings().pipe(
        map((ratings) => {
          return new AdminRatingActions.SetRatings(ratings);
        }),
        catchError((error) => {
          let errorMessage = 'No se pudo obtener las reseñas';
          return handleError(errorMessage);
        })
      );
    })
  );

  @Effect()
  deleteRatingStart = this.actions$.pipe(
    ofType(AdminRatingActions.DELETE_RATING_START),
    switchMap((action: AdminRatingActions.DeleteRatingStart) => {
      return this.ratingService.deleteRating(action.payload).pipe(
        map((res) => {
          return new AdminRatingActions.DeleteRating(action.payload);
        }),
        catchError((error) => {
          let errorMessage = 'No se pudo eliminar la reseña';
          return handleError(errorMessage);
        })
      );
    })
  );

  @Effect()
  deleteRating = this.actions$.pipe(
    ofType(AdminRatingActions.DELETE_RATING),
    switchMap((action: AdminRatingActions.DeleteRating) => {
      return of(
        new AdminRatingActions.OperationSucess(
          '✔️ Reseña eliminada exitosamente'
        )
      );
    })
  );

  @Effect()
  addRating = this.actions$.pipe(
    ofType(AdminRatingActions.ADD_RATING),
    switchMap((action: AdminRatingActions.AddRating) => {
      return this.ratingService.addRating(action.payload).pipe(
        map((res) => {
          this.router.navigate(['admin-rating']);
          return new AdminRatingActions.OperationSucess(
            '✔️ Reseña agregada exitosamente'
          );
        }),
        catchError((error) => {
          return handleError(error);
        })
      );
    })
  );

  @Effect()
  updateRating = this.actions$.pipe(
    ofType(AdminRatingActions.UPDATE_RATING),
    switchMap((action: AdminRatingActions.UpdateRating) => {
      return this.ratingService
        .updateRating(action.payload.id, action.payload.rating)
        .pipe(
          map((res) => {
            this.router.navigate(['admin-rating']);
            return new AdminRatingActions.OperationSucess(
              '✔️ Reseña editada exitosamente'
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
    private ratingService: RatingService,
    private router: Router
  ) {}
}
