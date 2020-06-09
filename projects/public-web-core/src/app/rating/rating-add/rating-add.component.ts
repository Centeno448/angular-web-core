import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserSelect } from '../../shared/userSelect.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Rating } from '../../shared/models/rating.model';
import * as fromApp from '../../store/app.reducer';
import * as RatingActions from '../store/rating.actions';

@Component({
  selector: 'app-rating-add',
  templateUrl: './rating-add.component.html',
  styleUrls: ['./rating-add.component.css']
})
export class RatingAddComponent implements OnInit, OnDestroy {
  ratingForm: FormGroup;
  users: UserSelect[];
  errorMessage: string;
  value = 2;

  private storeSub: Subscription;

  private userId: number;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.data.auth.id;
    this.storeSub = this.store.select('rating').subscribe((ratingState) => {
      this.errorMessage = ratingState.error;
      this.users = ratingState.validUsers;
      if (this.errorMessage) {
        setTimeout(this.clearError.bind(this), 5000);
      }
    });
    this.initForm();
  }

  initForm() {
    this.ratingForm = new FormGroup({
      toUser: new FormControl('', [Validators.required]),
      score: new FormControl(1.5, [
        Validators.required,
        Validators.max(5),
        Validators.min(0)
      ]),
      comment: new FormControl('', [Validators.maxLength(200)])
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  clearError() {
    this.store.dispatch(new RatingActions.ClearErrorMessage());
  }

  onSubmit() {
    if (!this.ratingForm.valid) {
      return;
    }

    const rating = new Rating(
      null,
      this.ratingForm.get('score').value,
      this.ratingForm.get('comment').value,
      this.ratingForm.get('toUser').value,
      this.userId.toString()
    );

    this.store.dispatch(new RatingActions.AddRating(rating));
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
