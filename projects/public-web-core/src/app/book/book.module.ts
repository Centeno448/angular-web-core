import { BookRoutingModule } from './book-routing.module';
import { BookAddComponent } from './book-add/book-add.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookComponent } from './book/book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    BookRoutingModule
  ],
  declarations: [BookComponent, BookEditComponent, BookAddComponent]
})
export class BookModule {}
