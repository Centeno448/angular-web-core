import { BookExchange } from './../../shared/models/book-exchange.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { BookSelect } from './../../shared/bookSelect.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { BookCategory } from '../../book-category/book-category.model';
import { ExchangeSelect } from '../exchange-select.model';
import * as fromApp from '../../store/app.reducer';
import * as ExchangeActions from '../store/book-exchange.actions';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-book-exchange-add',
  templateUrl: './book-exchange-add.component.html',
  styleUrls: ['./book-exchange-add.component.css']
})
export class BookExchangeAddComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  private userId: number;

  books: BookSelect[];
  categories: BookCategory[];
  validExchanges: ExchangeSelect[];
  selectedExchanges: ExchangeSelect[];

  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.data.auth.id;

    this.store.select('exchange').subscribe((exchangeState) => {
      this.validExchanges = exchangeState.validExchanges;
    });

    this.categories =
      this.route.snapshot.data.categories.payload == undefined
        ? this.route.snapshot.data.categories
        : this.route.snapshot.data.categories.payload;

    this.books =
      this.route.snapshot.data.books.payload == undefined
        ? this.route.snapshot.data.books
        : this.route.snapshot.data.books.payload;

    this.firstFormGroup = this._formBuilder.group({
      book: new FormControl('')
    });
    this.secondFormGroup = this._formBuilder.group({
      category: new FormControl('')
    });
  }

  getAvailableExchanges() {
    const categoryId = this.secondFormGroup.get('category').value;
    const userId = this.userId;
    this.store.dispatch(
      new ExchangeActions.FetchValidExchanges({ categoryId, userId })
    );
  }

  submit(exchange: any) {
    var valid = !!exchange.selectedOptions.selected[0];

    if (!valid) {
      return;
    }

    const fromBook = this.firstFormGroup.get('book').value;

    console.log(fromBook);
    var data = exchange.selectedOptions.selected[0]._value;
    var bookExchange = new BookExchange(
      null,
      data.userId,
      this.userId.toString(),
      data.bookId,
      fromBook,
      new Date()
    );

    this.store.dispatch(new ExchangeActions.AddExchange(bookExchange));
  }
}
