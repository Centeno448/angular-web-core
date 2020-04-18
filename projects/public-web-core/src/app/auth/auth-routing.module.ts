import { Routes, RouterModule } from '@angular/router';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { NgModule } from '@angular/core';
import { AuthWithUserGuard } from './auth-with-user.guard';

const routes: Routes = [
  {
    path: 'auth/login',
    component: AuthLoginComponent,
    canActivate: [AuthWithUserGuard]
  },
  {
    path: 'auth/register',
    component: AuthRegisterComponent,
    canActivate: [AuthWithUserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
