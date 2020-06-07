import { AdminAuthGuard } from './../auth/admin-auth.guard';
import { BookCategoryAddComponent } from './book-category-add/book-category-add.component';
import { BookCategoryEditComponent } from './book-category-edit/book-category-edit.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BookCategoryComponent } from './book-category/book-category.component';
import { BookCategoryResolver } from './book-category-resolver.service';

const routes: Routes = [
  {
    path: 'category',
    component: BookCategoryComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'category/edit/:id',
    component: BookCategoryEditComponent,
    canActivate: [AdminAuthGuard],
    resolve: [BookCategoryResolver]
  },
  {
    path: 'category/add',
    component: BookCategoryAddComponent,
    canActivate: [AdminAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookCategoryRoutingModule {}
