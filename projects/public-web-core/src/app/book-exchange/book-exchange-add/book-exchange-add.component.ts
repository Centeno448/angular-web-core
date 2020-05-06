import { BookExchange } from './../book-exchange.model';
import { BookSelect } from './../../shared/bookSelect.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserSelect } from '../../shared/userSelect.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer';
import * as ExchangeActions from '../store/exchange.actions';
import { take, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-exchange-add',
  templateUrl: './book-exchange-add.component.html',
  styleUrls: ['./book-exchange-add.component.css']
})
export class BookExchangeAddComponent implements OnInit, OnDestroy {
  exchangeForm: FormGroup;
  users: UserSelect[];
  toBooks: BookSelect[];
  fromBooks: BookSelect[];
  errorMessage: string;

  storeSub: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.users = this.route.snapshot.data.users;
    this.storeSub = this.store.select('exchange').subscribe((exchangeState) => {
      this.errorMessage = exchangeState.error;
      if (this.errorMessage) {
        setTimeout(this.clearError.bind(this), 5000);
      }
    });
    this.initForm();
  }

  initForm() {
    this.exchangeForm = new FormGroup({
      toUser: new FormControl('', [Validators.required]),
      toBook: new FormControl('', [Validators.required]),
      fromBook: new FormControl('', [Validators.required]),
      fromUser: new FormControl('', [Validators.required]),
      exchangeDate: new FormControl('', [Validators.required])
    });
  }

  checkUserValidity() {
    var to = this.exchangeForm.get('toUser');
    var from = this.exchangeForm.get('fromUser');

    if (to.value === from.value) {
      to.setErrors({ sameUser: true });
      from.setErrors({ sameUser: true });
    } else {
      to.setErrors({ sameUser: null });
      from.setErrors({ sameUser: null });
      to.updateValueAndValidity();
      from.updateValueAndValidity();
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  clearError() {
    this.store.dispatch(new ExchangeActions.ClearErrorMessage());
  }

  onSubmit() {
    if (!this.exchangeForm.valid) {
      return;
    }

    const exchange = new BookExchange(
      null,
      this.exchangeForm.get('toUser').value,
      this.exchangeForm.get('fromUser').value,
      this.exchangeForm.get('toBook').value,
      this.exchangeForm.get('fromBook').value,
      new Date(this.exchangeForm.get('exchangeDate').value._d)
    );

    this.store.dispatch(new ExchangeActions.AddExchange(exchange));
  }

  loadFromBooks() {
    this.fromBooks = [];
    const owner = this.users.find((user) => {
      return user.id === this.exchangeForm.get('fromUser').value;
    });

    this.store.select('book').subscribe((bookState) => {
      const books = bookState.books.filter((book) => {
        return book.owner === owner.username;
      });

      books.forEach((book) => {
        this.fromBooks.push(new BookSelect(book.id, book.name));
      });
    });
  }

  loadToBooks() {
    this.toBooks = [];

    const owner = this.users.find((user) => {
      return user.id === this.exchangeForm.get('toUser').value;
    });

    this.store.select('book').subscribe((bookState) => {
      const books = bookState.books.filter((book) => {
        return book.owner === owner.username;
      });

      books.forEach((book) => {
        this.toBooks.push(new BookSelect(book.id, book.name));
      });
    });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
