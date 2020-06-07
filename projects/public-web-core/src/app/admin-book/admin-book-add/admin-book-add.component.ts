import { map, take } from 'rxjs/operators';
import { Book } from '../../shared/models/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as fromApp from '../../store/app.reducer';
import * as BookActions from '../store/admin-book.actions';
import { Store } from '@ngrx/store';
import { BookCategory } from '../../book-category/book-category.model';
import { Subscription } from 'rxjs';
import { UserSelect } from '../../shared/userSelect.model';

@Component({
  selector: 'app-book-add',
  templateUrl: './admin-book-add.component.html',
  styleUrls: ['./admin-book-add.component.css']
})
export class AdminBookAddComponent implements OnInit {
  bookForm: FormGroup;
  categories: BookCategory[];
  users: UserSelect[];

  private categorySub: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.users = this.route.snapshot.data.users;
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
      publicationDate: new FormControl('', [Validators.required]),
      owner: new FormControl('', [Validators.required])
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
      this.bookForm.get('owner').value,
      this.bookForm.get('author').value,
      new Date(this.bookForm.get('publicationDate').value._d)
    );

    this.store.dispatch(new BookActions.AddBook(book));
  }
}
