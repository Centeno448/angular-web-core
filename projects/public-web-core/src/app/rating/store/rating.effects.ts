import { Router } from '@angular/router';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { RatingService } from '../../shared/services/rating.service';
import * as AdminRatingActions from './rating.actions';
import { of } from 'rxjs';

const handleError = (error) => {
  let errorMessage = 'No se pudo agregar la reseña';
  switch (error.error.message) {
    case 'DUPLICATE_RATING':
      errorMessage = 'Ya existe una reseña para ese usuario';
      break;

    default:
      break;
  }

  return of(new AdminRatingActions.ErrorOcurred(errorMessage));
};

@Injectable()
export class RatingEffects {
  @Effect()
  fetchRatings = this.actions$.pipe(
    ofType(AdminRatingActions.FETCH_RATINGS),
    switchMap((action: AdminRatingActions.FetchRatings) => {
      return this.ratingService.getRatingsFromUser(action.payload).pipe(
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
  fetchRecievedRatings = this.actions$.pipe(
    ofType(AdminRatingActions.FETCH_RECIEVED_RATINGS),
    switchMap((action: AdminRatingActions.FetchRecievedRatings) => {
      return this.ratingService.getRatingsToUser(action.payload).pipe(
        map((ratings) => {
          return new AdminRatingActions.SetRecievedRatings(ratings);
        }),
        catchError((error) => {
          let errorMessage = 'No se pudo obtener las reseñas';
          return handleError(errorMessage);
        })
      );
    })
  );

  @Effect()
  fetchValidUsers = this.actions$.pipe(
    ofType(AdminRatingActions.FETCH_VALID_USERS),
    switchMap((action: AdminRatingActions.FetchValidUsers) => {
      return this.ratingService.getValidRatingUsers(action.payload).pipe(
        map((users) => {
          return new AdminRatingActions.SetValidUsers(users);
        }),
        catchError((error) => {
          let errorMessage = 'No se pudo obtener los usuarios';
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
          this.router.navigate(['rating']);
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
            this.router.navigate(['rating']);
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
