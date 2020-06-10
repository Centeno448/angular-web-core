import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookExchange } from '../../shared/models/book-exchange.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as fromApp from '../../store/app.reducer';
import * as ExchangeActions from '../store/book-exchange.actions';

@Component({
  selector: 'app-book-exchange',
  templateUrl: './book-exchange.component.html',
  styleUrls: ['./book-exchange.component.css']
})
export class BookExchangeComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  dataSource: BookExchange[];
  errorMessage: string = '';
  displayedColumns = ['fromUser', 'toUser', 'exchangeDate'];

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

    this.storeSub = this.store.select('exchange').subscribe((exchangeState) => {
      this.isLoading = exchangeState.isLoading;
      this.dataSource = exchangeState.exchanges;
      this.errorMessage = exchangeState.error;

      if (exchangeState.success) {
        this._snackBar.open(exchangeState.success, null, {
          duration: this._snackBarDuration * 1000
        });
        this.store.dispatch(new ExchangeActions.ClearSuccessMessage());
      }

      if (this.errorMessage) {
        setTimeout(this.clearError.bind(this), 5000);
      }
    });

    this.store.dispatch(new ExchangeActions.FetchExchanges(this.userId));
  }

  clearError() {
    this.store.dispatch(new ExchangeActions.ClearErrorMessage());
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
