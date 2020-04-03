import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AddUserComponent } from './add-user/add-user.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'user/edit/:id', component: UserEditComponent },
  { path: 'user/add', component: AddUserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
