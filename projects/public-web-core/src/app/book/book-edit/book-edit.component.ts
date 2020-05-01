import { BookCategory } from './../../book-category/book-category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from './../book.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as BookActions from '../store/book.actions';
import { take, map } from 'rxjs/operators';
import { isMoment } from 'moment';
import { UserSelect } from '../../shared/userSelect.model';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  bookForm: FormGroup;
  private editedId: number;
  categories: BookCategory[];
  users: UserSelect[];

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editedId = +this.route.snapshot.paramMap.get('id');
    this.users = this.route.snapshot.data.users;
    this.categories =
      this.route.snapshot.data.categories.payload == undefined
        ? this.route.snapshot.data.categories
        : this.route.snapshot.data.categories.payload;
    console.log('USERS: ' + this.users);
    console.log('CATE: ' + this.categories);
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
    var owner = this.users.find((user) => {
      return user.username == book.owner;
    });

    var category = this.categories.find((category) => {
      return category.name == book.category;
    });

    this.bookForm.patchValue({
      name: book.name,
      author: book.author,
      publicationDate: book.publicationDate,
      owner: owner.id,
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
      publicationDate: new FormControl('', [Validators.required]),
      owner: new FormControl('', [Validators.required])
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
        this.bookForm.get('owner').value,
        this.bookForm.get('author').value,
        new Date(this.bookForm.get('publicationDate').value._d)
      );
    } else {
      book = new Book(
        null,
        this.bookForm.get('name').value,
        this.bookForm.get('category').value,
        this.bookForm.get('owner').value,
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
