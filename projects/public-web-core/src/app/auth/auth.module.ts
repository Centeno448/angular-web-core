import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';

@NgModule({
  declarations: [AuthRegisterComponent, AuthLoginComponent],
  imports: [MaterialModule, FormsModule, AuthRoutingModule]
})
export class AuthModule {}
