import { NotfoundComponent } from './shared/notfound/notfound.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { AddUserComponent } from './user/add-user/add-user.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/edit/:id', component: UserEditComponent },
  { path: 'user/add', component: AddUserComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
