import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookCategory } from '../../book-category/book-category.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { Book } from '../../shared/models/book.model';
import { isMoment } from 'moment';
import * as fromApp from '../../store/app.reducer';
import * as BookActions from '../store/book.actions';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  bookForm: FormGroup;
  private editedId: number;
  private userId: any;
  categories: BookCategory[];

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.data.auth.id;
    this.editedId = +this.route.snapshot.paramMap.get('id');
    this.categories =
      this.route.snapshot.data.categories.payload == undefined
        ? this.route.snapshot.data.categories
        : this.route.snapshot.data.categories.payload;
    this.initForm();
    this.prepareValues();
  }

  prepareValues() {
    this.store
      .select('book')
      .pipe(
        take(1),
        map((bookState) => {
          return bookState.books.find((book) => {
            return book.id === this.editedId;
          });
        })
      )
      .subscribe((book) => {
        this.setFormValues(book);
      });
  }

  setFormValues(book: Book) {
    var category = this.categories.find((category) => {
      return category.name == book.category;
    });

    this.bookForm.patchValue({
      name: book.name,
      author: book.author,
      publicationDate: book.publicationDate,
      category: category.id
    });
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

  onSubmit() {
    if (!this.bookForm.valid) {
      return;
    }

    var book: Book;
    if (isMoment(this.bookForm.get('publicationDate').value)) {
      book = new Book(
        null,
        this.bookForm.get('name').value,
        this.bookForm.get('category').value,
        this.userId,
        this.bookForm.get('author').value,
        new Date(this.bookForm.get('publicationDate').value._d)
      );
    } else {
      book = new Book(
        null,
        this.bookForm.get('name').value,
        this.bookForm.get('category').value,
        this.userId,
        this.bookForm.get('author').value,
        new Date(this.bookForm.get('publicationDate').value)
      );
    }

    this.store.dispatch(
      new BookActions.UpdateBook({ id: this.editedId, book })
    );
  }

  onCancel() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
