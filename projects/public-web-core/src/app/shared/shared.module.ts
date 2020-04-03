import { RouterModule } from '@angular/router';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DeleteConfirmationDialogComponent } from './dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  declarations: [
    NavComponent,
    NotfoundComponent,
    DeleteConfirmationDialogComponent
  ],
  exports: [NavComponent, NotfoundComponent, DeleteConfirmationDialogComponent],
  entryComponents: [DeleteConfirmationDialogComponent]
})
export class SharedModule {}
