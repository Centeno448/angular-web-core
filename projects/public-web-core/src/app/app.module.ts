import { RatingModule } from './rating/rating.module';
import { RatingEffects } from './rating/store/rating.effects';
import { ExchangeModule } from './book-exchange/book-exchange.module';
import { BookCategoryEffects } from './book-category/store/book-category.effects';
import { BookEffects } from './book/store/book.effects';
import { BookModule } from './book/book.module';
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
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import * as FromRoot from './store/app.reducer';
import { BookCategoryModule } from './book-category/book-category.module';
import { ExchangeEffects } from './book-exchange/store/exchange.effects';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotfoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    BookModule,
    BookCategoryModule,
    ExchangeModule,
    RatingModule,
    AppRoutingModule,
    MaterialModule,
    StoreModule.forRoot(FromRoot.appReducer),
    EffectsModule.forRoot([
      AuthEffects,
      BookEffects,
      BookCategoryEffects,
      ExchangeEffects,
      RatingEffects
    ]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
