import { AuthResolver } from './../auth/auth-resolver.service';
import { UserResolver } from '../shared/user-resolver.service';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../auth/auth.guard';
import { BookResolver } from '../book/book-resolver.service';
import { BookExchangeComponent } from './book-exchange/book-exchange.component';
import { BookExchangeAddComponent } from './book-exchange-add/book-exchange-add.component';
import { BookCategoryResolver } from '../book-category/book-category-resolver.service';

const routes: Routes = [
  {
    path: 'exchange',
    component: BookExchangeComponent,
    canActivate: [AuthGuard],
    resolve: {
      auth: AuthResolver
    }
  },
  {
    path: 'exchange/add',
    component: BookExchangeAddComponent,
    canActivate: [AuthGuard],
    resolve: {
      auth: AuthResolver,
      users: UserResolver,
      books: BookResolver,
      categories: BookCategoryResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExchangeRoutingModule {}
