import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { NavComponent } from './shared/nav/nav.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from './shared/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    NavComponent,
    HomeComponent,
    NotfoundComponent,
    UserEditComponent,
    DeleteConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [DeleteConfirmationDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
