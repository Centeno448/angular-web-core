import { AuthGuard } from './../auth/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AddUserComponent } from './add-user/add-user.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  {
    path: 'user/edit/:id',
    component: UserEditComponent,
    canActivate: [AuthGuard]
  },
  { path: 'user/add', component: AddUserComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
