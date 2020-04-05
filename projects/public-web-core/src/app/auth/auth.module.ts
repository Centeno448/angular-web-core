import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule, AuthRoutingModule],
  declarations: [AuthRegisterComponent, AuthLoginComponent]
})
export class AuthModule {}
