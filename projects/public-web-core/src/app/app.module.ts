import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthEffects } from './auth/store/auth.effects';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { NotfoundComponent } from './notfound/notfound.component';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserModule } from './user/user.module';
import { StoreModule } from '@ngrx/store';

import * as FromRoot from './store/app.reducer';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotfoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UserModule,
    SharedModule,
    AuthModule,
    AppRoutingModule,
    MaterialModule,
    StoreModule.forRoot(FromRoot.appReducer),
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
