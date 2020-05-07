import { Router } from '@angular/router';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { RatingService } from '../rating.service';
import * as RatingActions from './rating.actions';
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

  return of(new RatingActions.ErrorOcurred(errorMessage));
};

@Injectable()
export class RatingEffects {
  @Effect()
  fetchRatings = this.actions$.pipe(
    ofType(RatingActions.FETCH_RATINGS),
    switchMap((action: RatingActions.FetchRatings) => {
      return this.ratingService.getAllRatings().pipe(
        map((ratings) => {
          return new RatingActions.SetRatings(ratings);
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
    ofType(RatingActions.DELETE_RATING_START),
    switchMap((action: RatingActions.DeleteRatingStart) => {
      return this.ratingService.deleteRating(action.payload).pipe(
        map((res) => {
          return new RatingActions.DeleteRating(action.payload);
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
    ofType(RatingActions.DELETE_RATING),
    switchMap((action: RatingActions.DeleteRating) => {
      return of(
        new RatingActions.OperationSucess('✔️ Reseña eliminada exitosamente')
      );
    })
  );

  @Effect()
  addRating = this.actions$.pipe(
    ofType(RatingActions.ADD_RATING),
    switchMap((action: RatingActions.AddRating) => {
      return this.ratingService.addRating(action.payload).pipe(
        map((res) => {
          this.router.navigate(['rating']);
          return new RatingActions.OperationSucess(
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
    ofType(RatingActions.UPDATE_RATING),
    switchMap((action: RatingActions.UpdateRating) => {
      return this.ratingService
        .updateRating(action.payload.id, action.payload.rating)
        .pipe(
          map((res) => {
            this.router.navigate(['rating']);
            return new RatingActions.OperationSucess(
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
