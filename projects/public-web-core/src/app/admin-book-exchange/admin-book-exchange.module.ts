import { AdminBookExchangeComponent } from './admin-book-exchange/admin-book-exchange.component';
import { AdminExchangeRoutingModule } from './admin-book-exchange-routing.module';
import { AdminBookExchangeAddComponent } from './admin-book-exchange-add/admin-book-exchange-add.component';
import { AdminBookExchangeEditComponent } from './admin-book-exchange-edit/admin-book-exchange-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    AdminExchangeRoutingModule
  ],
  declarations: [
    AdminBookExchangeComponent,
    AdminBookExchangeAddComponent,
    AdminBookExchangeEditComponent
  ]
})
export class AdminExchangeModule {}
