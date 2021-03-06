import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookCategory } from '../../book-category/book-category.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../shared/models/book.model';
import * as fromApp from '../../store/app.reducer';
import * as BookActions from '../store/book.actions';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  bookForm: FormGroup;
  categories: BookCategory[];
  private userId: any;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.data.auth.id;
    this.categories =
      this.route.snapshot.data.categories.payload == null
        ? this.route.snapshot.data.categories
        : this.route.snapshot.data.categories.payload;
    this.initForm();
  }

  initForm() {
    this.bookForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(200)
      ]),
      author: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      category: new FormControl('', [Validators.required]),
      publicationDate: new FormControl('', [Validators.required])
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    if (!this.bookForm.valid) {
      return;
    }

    const book = new Book(
      null,
      this.bookForm.get('name').value,
      this.bookForm.get('category').value,
      this.userId,
      this.bookForm.get('author').value,
      new Date(this.bookForm.get('publicationDate').value._d)
    );

    this.store.dispatch(new BookActions.AddBook(book));
  }
}
