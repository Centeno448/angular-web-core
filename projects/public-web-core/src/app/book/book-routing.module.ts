import { UserResolver } from '../shared/user-resolver.service';
import { BookResolver } from './book-resolver.service';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BookCategoryResolver } from '../book-category/book-category-resolver.service';
import { AuthGuard } from '../auth/auth.guard';
import { BookComponent } from './book/book.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookAddComponent } from './book-add/book-add.component';
import { AuthResolver } from '../auth/auth-resolver.service';

const routes: Routes = [
  {
    path: 'book',
    component: BookComponent,
    canActivate: [AuthGuard],
    resolve: {
      auth: AuthResolver
    }
  },
  {
    path: 'book/edit/:id',
    component: BookEditComponent,
    canActivate: [AuthGuard],
    resolve: {
      auth: AuthResolver,
      BookResolver,
      categories: BookCategoryResolver
    }
  },
  {
    path: 'book/add',
    component: BookAddComponent,
    canActivate: [AuthGuard],
    resolve: { categories: BookCategoryResolver, auth: AuthResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UserResolver]
})
export class BookRoutingModule {}
