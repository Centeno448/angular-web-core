import { AdminAuthGuard } from '../auth/admin-auth.guard';
import { UserResolver } from '../shared/user-resolver.service';
import { AdminBookResolver } from './admin-book-resolver.service';
import { AdminBookAddComponent } from './admin-book-add/admin-book-add.component';
import { AdminBookEditComponent } from './admin-book-edit/admin-book-edit.component';
import { AdminBookComponent } from './admin-book/admin-book.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BookCategoryResolver } from '../book-category/book-category-resolver.service';

const routes: Routes = [
  {
    path: 'admin-book',
    component: AdminBookComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin-book/edit/:id',
    component: AdminBookEditComponent,
    canActivate: [AdminAuthGuard],
    resolve: {
      AdminBookResolver,
      users: UserResolver,
      categories: BookCategoryResolver
    }
  },
  {
    path: 'admin-book/add',
    component: AdminBookAddComponent,
    canActivate: [AdminAuthGuard],
    resolve: { categories: BookCategoryResolver, users: UserResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UserResolver]
})
export class AdminBookRoutingModule {}
