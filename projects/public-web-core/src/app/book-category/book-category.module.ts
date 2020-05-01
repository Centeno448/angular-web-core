import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { BookCategoryRoutingModule } from './book-category-routing.module';
import { BookCategoryComponent } from './book-category/book-category.component';
import { BookCategoryEditComponent } from './book-category-edit/book-category-edit.component';
import { BookCategoryAddComponent } from './book-category-add/book-category-add.component';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    BookCategoryRoutingModule
  ],
  declarations: [
    BookCategoryComponent,
    BookCategoryEditComponent,
    BookCategoryAddComponent
  ]
})
export class BookCategoryModule {}
