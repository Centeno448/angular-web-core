import { AdminRatingComponent } from './admin-rating/admin-rating.component';
import { AdminRatingRoutingModule } from './admin-rating-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { NgModule } from '@angular/core';
import { AdminRatingAddComponent } from './admin-rating-add/admin-rating-add.component';
import { AdminRatingEditComponent } from './admin-rating-edit/admin-rating-edit.component';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    AdminRatingRoutingModule
  ],
  declarations: [
    AdminRatingComponent,
    AdminRatingAddComponent,
    AdminRatingEditComponent
  ]
})
export class AdminRatingModule {}
