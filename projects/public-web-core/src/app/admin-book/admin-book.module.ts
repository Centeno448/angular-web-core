import { AdminBookRoutingModule } from './admin-book-routing.module';
import { AdminBookAddComponent } from './admin-book-add/admin-book-add.component';
import { AdminBookEditComponent } from './admin-book-edit/admin-book-edit.component';
import { AdminBookComponent } from './admin-book/admin-book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    AdminBookRoutingModule
  ],
  declarations: [
    AdminBookComponent,
    AdminBookEditComponent,
    AdminBookAddComponent
  ]
})
export class AdminBookModule {}
