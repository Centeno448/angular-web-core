import { BookEffects } from './book/store/book.effects';
import { AdminRatingModule } from './admin-rating/admin-rating.module';
import { AdminRatingEffects } from './admin-rating/store/admin-rating.effects';
import { AdminExchangeModule } from './admin-book-exchange/admin-book-exchange.module';
import { BookCategoryEffects } from './book-category/store/book-category.effects';
import { AdminBookEffects } from './admin-book/store/admin-book.effects';
import { AdminBookModule } from './admin-book/admin-book.module';
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
import { AdminHomeComponent } from './admin-home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import * as FromRoot from './store/app.reducer';
import { BookCategoryModule } from './book-category/book-category.module';
import { AdminExchangeEffects } from './admin-book-exchange/store/admin-exchange.effects';
import { UserHomeComponent } from './user-home/user-home.component';
import { BookModule } from './book/book.module';

@NgModule({
  declarations: [
    AppComponent,
    AdminHomeComponent,
    NotfoundComponent,
    UserHomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    AdminBookModule,
    BookModule,
    BookCategoryModule,
    AdminExchangeModule,
    AdminRatingModule,
    AppRoutingModule,
    MaterialModule,
    StoreModule.forRoot(FromRoot.appReducer),
    EffectsModule.forRoot([
      AuthEffects,
      AdminBookEffects,
      BookCategoryEffects,
      AdminExchangeEffects,
      AdminRatingEffects,
      BookEffects
    ]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
