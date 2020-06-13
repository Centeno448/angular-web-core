import { BookExchange } from '../../shared/models/book-exchange.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserSelect } from '../../shared/userSelect.model';
import { BookSelect } from '../../shared/bookSelect.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer';
import * as ExchangeActions from '../store/admin-exchange.actions';
import { take, map } from 'rxjs/operators';
import { isMoment } from 'moment';

@Component({
  selector: 'app-book-exchange-edit',
  templateUrl: './admin-book-exchange-edit.component.html',
  styleUrls: ['./admin-book-exchange-edit.component.css']
})
export class AdminBookExchangeEditComponent implements OnInit, OnDestroy {
  exchangeForm: FormGroup;
  users: UserSelect[];
  toBooks: BookSelect[];
  fromBooks: BookSelect[];
  errorMessage: string;
  private editedId: number;

  storeSub: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editedId = +this.route.snapshot.paramMap.get('id');
    this.users = this.route.snapshot.data.users;
    this.storeSub = this.store
      .select('adminexchange')
      .subscribe((exchangeState) => {
        this.errorMessage = exchangeState.error;
        if (this.errorMessage) {
          setTimeout(this.clearError.bind(this), 5000);
        }
      });
    this.initForm();
    this.prepareValues();
  }

  prepareValues() {
    this.store
      .select('adminexchange')
      .pipe(
        take(1),
        map((exchangeState) => {
          return exchangeState.exchanges.find((exchange) => {
            return exchange.id === this.editedId;
          });
        })
      )
      .subscribe((exchange) => {
        this.setFormValues(exchange);
      });
  }

  setFormValues(exchange: BookExchange) {
    var toUser = this.users.find((user) => {
      return user.username == exchange.toUser;
    });

    var fromUser = this.users.find((user) => {
      return user.username == exchange.fromUser;
    });

    this.exchangeForm.patchValue({
      toUser: toUser.id,
      fromUser: fromUser.id,
      exchangeDate: exchange.exchangeDate,
      failed: exchange.failed
    });

    this.loadToBooks();
    this.loadFromBooks();
  }

  initForm() {
    this.exchangeForm = new FormGroup({
      toUser: new FormControl('', [Validators.required]),
      toBook: new FormControl('', [Validators.required]),
      fromBook: new FormControl('', [Validators.required]),
      fromUser: new FormControl('', [Validators.required]),
      exchangeDate: new FormControl('', [Validators.required]),
      failed: new FormControl('')
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
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  clearError() {
    this.store.dispatch(new ExchangeActions.ClearErrorMessage());
  }

  onSubmit() {
    if (!this.exchangeForm.valid) {
      return;
    }

    var exchange: BookExchange;

    if (isMoment(this.exchangeForm.get('exchangeDate').value)) {
      exchange = new BookExchange(
        null,
        this.exchangeForm.get('toUser').value,
        this.exchangeForm.get('fromUser').value,
        this.exchangeForm.get('toBook').value,
        this.exchangeForm.get('fromBook').value,
        new Date(this.exchangeForm.get('exchangeDate').value._d),
        this.exchangeForm.get('failed').value
      );
    } else {
      exchange = new BookExchange(
        null,
        this.exchangeForm.get('toUser').value,
        this.exchangeForm.get('fromUser').value,
        this.exchangeForm.get('toBook').value,
        this.exchangeForm.get('fromBook').value,
        new Date(this.exchangeForm.get('exchangeDate').value),
        this.exchangeForm.get('failed').value
      );
    }

    const id = this.editedId;

    this.store.dispatch(new ExchangeActions.UpdateExchange({ id, exchange }));
  }

  loadFromBooks() {
    this.fromBooks = [];
    const owner = this.users.find((user) => {
      return user.id === this.exchangeForm.get('fromUser').value;
    });

    this.store.select('adminbook').subscribe((bookState) => {
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

    this.store.select('adminbook').subscribe((bookState) => {
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
