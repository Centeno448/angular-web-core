import { Routes, RouterModule } from '@angular/router';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'auth/login', component: AuthLoginComponent },
  { path: 'auth/register', component: AuthRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
