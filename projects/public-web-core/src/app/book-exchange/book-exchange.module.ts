import { BookExchangeComponent } from './book-exchange/book-exchange.component';
import { ExchangeRoutingModule } from './book-exchange-routing.module';
import { BookExchangeAddComponent } from './book-exchange-add/book-exchange-add.component';
import { BookExchangeEditComponent } from './book-exchange-edit/book-exchange-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    ExchangeRoutingModule
  ],
  declarations: [
    BookExchangeComponent,
    BookExchangeAddComponent,
    BookExchangeEditComponent
  ]
})
export class ExchangeModule {}
