import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../../shared/models/book.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as fromApp from '../../store/app.reducer';
import * as BookActions from '../store/book.actions';
import { DeleteConfirmationDialogComponent } from '../../shared/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { take, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  dataSource: Book[];
  errorMessage: string = '';
  displayedColumns = [
    'name',
    'author',
    'publicationDate',
    'category',
    'actions'
  ];

  private storeSub: Subscription;
  private userId: number;
  private dialogSub: Subscription;
  private _snackBarDuration = 2;

  constructor(
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.data.auth.id;

    this.storeSub = this.store.select('book').subscribe((bookState) => {
      this.isLoading = bookState.isLoading;
      this.dataSource = bookState.books;
      this.errorMessage = bookState.error;
      if (bookState.success) {
        this._snackBar.open(bookState.success, null, {
          duration: this._snackBarDuration * 1000
        });
        this.store.dispatch(new BookActions.ClearSuccessMessage());
      }
    });

    this.store.dispatch(new BookActions.FetchBooks(this.userId));
  }

  deleteDialog(name: string, id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '300px',
      data: { type: 'Libro', name }
    });

    this.dialogSub = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteBook(id);
      }
    });
  }

  deleteBook(id: number) {
    this.store.dispatch(new BookActions.DeleteBookStart(id));
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
