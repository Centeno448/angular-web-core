import { BookAddComponent } from './book-add/book-add.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookComponent } from './book/book.component';
import { AuthGuard } from './../auth/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'book', component: BookComponent, canActivate: [AuthGuard] },
  {
    path: 'book/edit/:id',
    component: BookEditComponent,
    canActivate: [AuthGuard]
  },
  { path: 'book/add', component: BookAddComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule {}
