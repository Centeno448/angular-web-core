import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer';
import * as BookCategoryActions from '../store/book-category.actions';
import { BookCategory } from '../book-category.model';

@Component({
  selector: 'app-book-category-add',
  templateUrl: './book-category-add.component.html',
  styleUrls: ['./book-category-add.component.css']
})
export class BookCategoryAddComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.categoryForm = new FormGroup({
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

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    if (!this.categoryForm.valid) {
      return;
    }

    const category = new BookCategory(
      null,
      this.categoryForm.get('name').value,
      this.categoryForm.get('description').value
    );

    this.store.dispatch(new BookCategoryActions.AddCategory(category));
  }
}
