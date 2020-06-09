import { Component, OnInit } from '@angular/core';
import { Rating } from '../../shared/models/rating.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import * as fromApp from '../../store/app.reducer';
import * as RatingActions from '../store/rating.actions';

@Component({
  selector: 'app-rating-recieved',
  templateUrl: './rating-recieved.component.html',
  styleUrls: ['./rating-recieved.component.css']
})
export class RatingRecievedComponent implements OnInit {
  isLoading: boolean;
  dataSource: Rating[];
  errorMessage: string = '';
  displayedColumns = ['fromUser', 'score', 'comment'];

  private storeSub: Subscription;
  private _snackBarDuration = 2;
  private userId: number;

  constructor(
    private store: Store<fromApp.AppState>,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.data.auth.id;

    this.storeSub = this.store.select('rating').subscribe((ratingState) => {
      this.isLoading = ratingState.isLoading;
      this.dataSource = ratingState.recievedRatings;
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

    this.store.dispatch(new RatingActions.FetchRecievedRatings(this.userId));
  }

  clearError() {
    this.store.dispatch(new RatingActions.ClearErrorMessage());
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
