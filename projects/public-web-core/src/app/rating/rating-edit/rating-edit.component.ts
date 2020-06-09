import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserSelect } from '../../shared/userSelect.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { Rating } from '../../shared/models/rating.model';
import * as fromApp from '../../store/app.reducer';
import * as RatingActions from '../store/rating.actions';

@Component({
  selector: 'app-rating-edit',
  templateUrl: './rating-edit.component.html',
  styleUrls: ['./rating-edit.component.css']
})
export class RatingEditComponent implements OnInit, OnDestroy {
  ratingForm: FormGroup;
  users: UserSelect[];
  errorMessage: string;

  private editedId: number;
  private userId: number;
  private storeSub: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.data.auth.id;
    this.editedId = +this.route.snapshot.paramMap.get('id');

    this.storeSub = this.store.select('rating').subscribe((ratingState) => {
      this.errorMessage = ratingState.error;
      this.users = ratingState.validUsers;
      if (this.errorMessage) {
        setTimeout(this.clearError.bind(this), 5000);
      }
    });
    this.initForm();
    this.prepareValues();
  }

  prepareValues() {
    this.store
      .select('rating')
      .pipe(
        take(1),
        map((ratingState) => {
          return ratingState.sentRatings.find((rating) => {
            return rating.id === this.editedId;
          });
        })
      )
      .subscribe((rating) => {
        this.setFormValues(rating);
      });
  }

  setFormValues(rating: Rating) {
    var toUser = this.users.find((user) => {
      return user.username == rating.toUser;
    });

    this.ratingForm.patchValue({
      toUser: toUser.id,
      score: rating.score,
      comment: rating.comment
    });
  }

  initForm() {
    this.ratingForm = new FormGroup({
      toUser: new FormControl('', [Validators.required]),
      score: new FormControl('', [
        Validators.required,
        Validators.max(5),
        Validators.min(0)
      ]),
      comment: new FormControl('', [Validators.maxLength(200)])
    });
  }

  onCancel() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  clearError() {
    this.store.dispatch(new RatingActions.ClearErrorMessage());
  }

  onSubmit() {
    if (!this.ratingForm.valid) {
      return;
    }

    var rating = new Rating(
      null,
      +this.ratingForm.get('score').value,
      this.ratingForm.get('comment').value,
      this.ratingForm.get('toUser').value,
      this.userId.toString()
    );

    const id = this.editedId;

    this.store.dispatch(new RatingActions.UpdateRating({ id, rating }));
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
