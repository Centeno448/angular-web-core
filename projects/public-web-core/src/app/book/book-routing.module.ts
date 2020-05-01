import { UserResolver } from './../shared/user-resolver.service';
import { BookResolver } from './book-resolver.service';
import { BookAddComponent } from './book-add/book-add.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookComponent } from './book/book.component';
import { AuthGuard } from './../auth/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BookCategoryResolver } from '../book-category/book-category-resolver.service';

const routes: Routes = [
  { path: 'book', component: BookComponent, canActivate: [AuthGuard] },
  {
    path: 'book/edit/:id',
    component: BookEditComponent,
    canActivate: [AuthGuard],
    resolve: {
      BookResolver,
      users: UserResolver,
      categories: BookCategoryResolver
    }
  },
  {
    path: 'book/add',
    component: BookAddComponent,
    canActivate: [AuthGuard],
    resolve: { categories: BookCategoryResolver, users: UserResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UserResolver]
})
export class BookRoutingModule {}
