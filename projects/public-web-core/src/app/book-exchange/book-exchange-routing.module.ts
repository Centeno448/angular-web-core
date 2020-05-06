import { ExchangeResolver } from './book-exchange-resolver.service';
import { BookResolver } from './../book/book-resolver.service';
import { UserResolver } from './../shared/user-resolver.service';
import { BookExchangeAddComponent } from './book-exchange-add/book-exchange-add.component';
import { BookExchangeEditComponent } from './book-exchange-edit/book-exchange-edit.component';
import { BookExchangeComponent } from './book-exchange/book-exchange.component';
import { AuthGuard } from './../auth/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'exchange',
    component: BookExchangeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'exchange/edit/:id',
    component: BookExchangeEditComponent,
    canActivate: [AuthGuard],
    resolve: {
      users: UserResolver,
      books: BookResolver,
      ExchangeResolver
    }
  },
  {
    path: 'exchange/add',
    component: BookExchangeAddComponent,
    canActivate: [AuthGuard],
    resolve: {
      users: UserResolver,
      books: BookResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExchangeRoutingModule {}
