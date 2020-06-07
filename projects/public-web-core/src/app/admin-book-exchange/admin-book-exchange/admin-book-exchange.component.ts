import { Component, OnInit } from '@angular/core';
import { BookExchange } from '../book-exchange.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmationDialogComponent } from '../../shared/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import * as fromApp from '../../store/app.reducer';
import * as ExchangeActions from '../store/admin-exchange.actions';

@Component({
  selector: 'app-book-exchange',
  templateUrl: './admin-book-exchange.component.html',
  styleUrls: ['./admin-book-exchange.component.css']
})
export class AdminBookExchangeComponent implements OnInit {
  isLoading: boolean;
  dataSource: BookExchange[];
  errorMessage: string = '';
  displayedColumns = [
    'id',
    'fromUser',
    'fromBook',
    'toUser',
    'toBook',
    'exchangeDate',
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
    this.storeSub = this.store
      .select('adminexchange')
      .subscribe((exchangeState) => {
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

    this.store.dispatch(new ExchangeActions.FetchExchanges());
  }

  clearError() {
    this.store.dispatch(new ExchangeActions.ClearErrorMessage());
  }

  deleteDialog(name: string, id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '300px',
      data: { type: 'Intercambio', name }
    });

    this.dialogSub = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteExchange(id);
      }
    });
  }

  deleteExchange(id: number) {
    this.store.dispatch(new ExchangeActions.DeleteExchangeStart(id));
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
