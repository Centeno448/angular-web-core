import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AdminAuthGuard } from './auth/admin-auth.guard';
import { UserHomeComponent } from './user-home/user-home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
    canActivate: [AdminAuthGuard]
  },
  { path: 'home', component: UserHomeComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
