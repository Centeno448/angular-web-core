import { BookCategoryAddComponent } from './book-category-add/book-category-add.component';
import { BookCategoryEditComponent } from './book-category-edit/book-category-edit.component';
import { AuthGuard } from './../auth/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BookCategoryComponent } from './book-category/book-category.component';
import { BookCategoryResolver } from './book-category-resolver.service';

const routes: Routes = [
  {
    path: 'category',
    component: BookCategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'category/edit/:id',
    component: BookCategoryEditComponent,
    canActivate: [AuthGuard],
    resolve: [BookCategoryResolver]
  },
  {
    path: 'category/add',
    component: BookCategoryAddComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookCategoryRoutingModule {}
