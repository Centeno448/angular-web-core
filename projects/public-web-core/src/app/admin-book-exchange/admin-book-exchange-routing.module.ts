import { ExchangeResolver } from './book-exchange-resolver.service';
import { AdminBookResolver } from '../admin-book/admin-book-resolver.service';
import { UserResolver } from '../shared/user-resolver.service';
import { AdminBookExchangeAddComponent } from './admin-book-exchange-add/admin-book-exchange-add.component';
import { AdminBookExchangeEditComponent } from './admin-book-exchange-edit/admin-book-exchange-edit.component';
import { AdminBookExchangeComponent } from './admin-book-exchange/admin-book-exchange.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminAuthGuard } from '../auth/admin-auth.guard';

const routes: Routes = [
  {
    path: 'admin-exchange',
    component: AdminBookExchangeComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin-exchange/edit/:id',
    component: AdminBookExchangeEditComponent,
    canActivate: [AdminAuthGuard],
    resolve: {
      users: UserResolver,
      books: AdminBookResolver,
      ExchangeResolver
    }
  },
  {
    path: 'admin-exchange/add',
    component: AdminBookExchangeAddComponent,
    canActivate: [AdminAuthGuard],
    resolve: {
      users: UserResolver,
      books: AdminBookResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminExchangeRoutingModule {}
