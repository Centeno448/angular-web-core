import { RatingResolver } from './rating-resolver.service';
import { UserResolver } from './../shared/user-resolver.service';
import { RatingComponent } from './rating/rating.component';
import { AuthGuard } from './../auth/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RatingEditComponent } from './rating-edit/rating-edit.component';
import { RatingAddComponent } from './rating-add/rating-add.component';

const routes: Routes = [
  {
    path: 'rating',
    component: RatingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rating/edit/:id',
    component: RatingEditComponent,
    canActivate: [AuthGuard],
    resolve: {
      RatingResolver,
      users: UserResolver
    }
  },
  {
    path: 'rating/add',
    component: RatingAddComponent,
    canActivate: [AuthGuard],
    resolve: {
      users: UserResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RatingRoutingModule {}
