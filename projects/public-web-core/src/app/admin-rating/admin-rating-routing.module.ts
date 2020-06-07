import { AdminAuthGuard } from '../auth/admin-auth.guard';
import { RatingResolver } from './rating-resolver.service';
import { UserResolver } from '../shared/user-resolver.service';
import { AdminRatingComponent } from './admin-rating/admin-rating.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminRatingEditComponent } from './admin-rating-edit/admin-rating-edit.component';
import { AdminRatingAddComponent } from './admin-rating-add/admin-rating-add.component';

const routes: Routes = [
  {
    path: 'admin-rating',
    component: AdminRatingComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin-rating/edit/:id',
    component: AdminRatingEditComponent,
    canActivate: [AdminAuthGuard],
    resolve: {
      RatingResolver,
      users: UserResolver
    }
  },
  {
    path: 'admin-rating/add',
    component: AdminRatingAddComponent,
    canActivate: [AdminAuthGuard],
    resolve: {
      users: UserResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRatingRoutingModule {}
