import { RouterModule } from '@angular/router';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { DeleteConfirmationDialogComponent } from './dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  declarations: [NavComponent, DeleteConfirmationDialogComponent],
  exports: [NavComponent, DeleteConfirmationDialogComponent],
  entryComponents: [DeleteConfirmationDialogComponent]
})
export class SharedModule {}
