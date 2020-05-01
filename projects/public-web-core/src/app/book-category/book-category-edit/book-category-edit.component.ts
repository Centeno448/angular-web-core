import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { take, map } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import { BookCategory } from '../book-category.model';
import * as BookCategoryActions from '../store/book-category.actions';

@Component({
  selector: 'app-book-category-edit',
  templateUrl: './book-category-edit.component.html',
  styleUrls: ['./book-category-edit.component.css']
})
export class BookCategoryEditComponent implements OnInit {
  bookCategoryForm: FormGroup;
  private editedId: number;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editedId = +this.route.snapshot.paramMap.get('id');
    this.initForm();
    this.prepareValues();
  }

  prepareValues() {
    this.store
      .select('category')
      .pipe(
        take(1),
        map((categoryState) => {
          return categoryState.categories.find((category) => {
            return category.id === this.editedId;
          });
        })
      )
      .subscribe((category) => {
        this.setFormValues(category);
      });
  }

  setFormValues(category: BookCategory) {
    this.bookCategoryForm.patchValue({
      name: category.name,
      description: category.description
    });
  }

  initForm() {
    this.bookCategoryForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(200)
      ])
    });
  }

  onSubmit() {
    if (!this.bookCategoryForm.valid) {
      return;
    }

    var category = new BookCategory(
      null,
      this.bookCategoryForm.get('name').value,
      this.bookCategoryForm.get('description').value
    );

    this.store.dispatch(
      new BookCategoryActions.UpdateCategory({ id: this.editedId, category })
    );
  }

  onCancel() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
