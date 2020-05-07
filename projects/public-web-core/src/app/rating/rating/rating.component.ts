import { Rating } from './../rating.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as fromApp from '../../store/app.reducer';
import * as RatingActions from '../store/rating.actions';
import { DeleteConfirmationDialogComponent } from '../../shared/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  dataSource: Rating[];
  errorMessage: string = '';
  displayedColumns = [
    'id',
    'score',
    'comment',
    'fromUser',
    'toUser',
    'actions'
  ];

  private storeSub: Subscription;
  private dialogSub: Subscription;
  private _snackBarDuration = 2;

  constructor(
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.storeSub = this.store.select('rating').subscribe((ratingState) => {
      this.isLoading = ratingState.isLoading;
      this.dataSource = ratingState.ratings;
      this.errorMessage = ratingState.error;

      if (ratingState.success) {
        this._snackBar.open(ratingState.success, null, {
          duration: this._snackBarDuration * 1000
        });
        this.store.dispatch(new RatingActions.ClearSuccessMessage());
      }

      if (this.errorMessage) {
        setTimeout(this.clearError.bind(this), 5000);
      }
    });

    this.store.dispatch(new RatingActions.FetchRatings());
  }

  clearError() {
    this.store.dispatch(new RatingActions.ClearErrorMessage());
  }

  deleteDialog(name: string, id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '300px',
      data: { type: 'Reseña', name }
    });

    this.dialogSub = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteExchange(id);
      }
    });
  }

  deleteExchange(id: number) {
    this.store.dispatch(new RatingActions.DeleteRatingStart(id));
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
    if (this.dialogSub) {
      this.dialogSub.unsubscribe();
    }
  }
}
