import { BookCategory } from './../book-category.model';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as fromApp from '../../store/app.reducer';
import * as BookCategoryActions from '../store/book-category.actions';
import { DeleteConfirmationDialogComponent } from '../../shared/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrls: ['./book-category.component.css']
})
export class BookCategoryComponent implements OnInit {
  isLoading: boolean;
  dataSource: BookCategory[];
  errorMessage: string = '';
  displayedColumns = ['id', 'name', 'description', 'actions'];

  private storeSub: Subscription;
  private dialogSub: Subscription;
  private _snackBarDuration = 2;

  constructor(
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.storeSub = this.store.select('category').subscribe((categoryState) => {
      this.isLoading = categoryState.isLoading;
      this.dataSource = categoryState.categories;
      this.errorMessage = categoryState.error;
      if (categoryState.success) {
        this._snackBar.open(categoryState.success, null, {
          duration: this._snackBarDuration * 1000
        });
        this.store.dispatch(new BookCategoryActions.ClearSuccessMessage());
      }
    });

    this.store.dispatch(new BookCategoryActions.FetchCategories());
  }

  deleteDialog(name: string, id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '300px',
      data: { type: 'Categoría', name }
    });

    this.dialogSub = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteCategory(id);
      }
    });
  }

  deleteCategory(id: number) {
    this.store.dispatch(new BookCategoryActions.DeleteCategoryStart(id));
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
