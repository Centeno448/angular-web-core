import { RatingUserResolver } from './rating-user-resolver.service';
import { AuthResolver } from './../auth/auth-resolver.service';
import { RatingResolver } from './rating-resolver.service';
import { AuthGuard } from './../auth/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RatingComponent } from './rating/rating.component';
import { RatingRecievedComponent } from './rating-recieved/rating-recieved.component';
import { RatingEditComponent } from './rating-edit/rating-edit.component';
import { RatingAddComponent } from './rating-add/rating-add.component';

const routes: Routes = [
  {
    path: 'rating',
    component: RatingComponent,
    canActivate: [AuthGuard],
    resolve: { auth: AuthResolver }
  },
  {
    path: 'rating-recieved',
    component: RatingRecievedComponent,
    canActivate: [AuthGuard],
    resolve: { auth: AuthResolver }
  },
  {
    path: 'rating/edit/:id',
    component: RatingEditComponent,
    canActivate: [AuthGuard],
    resolve: {
      auth: AuthResolver,
      RatingResolver,
      RatingUserResolver
    }
  },
  {
    path: 'rating/add',
    component: RatingAddComponent,
    canActivate: [AuthGuard],
    resolve: {
      auth: AuthResolver,
      RatingUserResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RatingRoutingModule {}
