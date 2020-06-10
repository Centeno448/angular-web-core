import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { ExchangeRoutingModule } from './book-exchange-routing.module';
import { BookExchangeComponent } from './book-exchange/book-exchange.component';
import { BookExchangeAddComponent } from './book-exchange-add/book-exchange-add.component';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    ExchangeRoutingModule
  ],
  declarations: [BookExchangeComponent, BookExchangeAddComponent]
})
export class ExchangeModule {}
